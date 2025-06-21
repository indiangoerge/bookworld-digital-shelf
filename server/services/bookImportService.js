const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { Book } = require('../models');
const { bookValidationSchema } = require('../utils/validators');
const logger = require('../utils/logger');

class BookImportService {
  constructor() {
    this.batchSize = 500;
    this.failedRows = [];
  }

  async importBooksFromExcel(filePath = process.env.EXCEL_UPLOAD_PATH) {
    try {
      logger.info(`Starting book import from: ${filePath}`);
      
      if (!fs.existsSync(filePath)) {
        throw new Error(`Excel file not found at: ${filePath}`);
      }

      // Read Excel file
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const rawData = XLSX.utils.sheet_to_json(worksheet);

      logger.info(`Found ${rawData.length} rows in Excel file`);

      let processedCount = 0;
      let successCount = 0;
      let failedCount = 0;

      // Process in batches
      for (let i = 0; i < rawData.length; i += this.batchSize) {
        const batch = rawData.slice(i, i + this.batchSize);
        const result = await this.processBatch(batch, i + 1);
        
        successCount += result.success;
        failedCount += result.failed;
        processedCount += batch.length;

        logger.info(`Processed batch ${Math.ceil((i + 1) / this.batchSize)}: ${result.success} success, ${result.failed} failed`);
      }

      // Export failed rows to CSV
      if (this.failedRows.length > 0) {
        await this.exportFailedRows();
      }

      const summary = {
        totalRows: rawData.length,
        processed: processedCount,
        successful: successCount,
        failed: failedCount,
        failedRowsExported: this.failedRows.length > 0
      };

      logger.info('Import completed', summary);
      return summary;

    } catch (error) {
      logger.error('Book import failed:', error);
      throw error;
    }
  }

  async processBatch(batch, startRowNumber) {
    const validBooks = [];
    let successCount = 0;
    let failedCount = 0;

    // Validate each row
    for (let i = 0; i < batch.length; i++) {
      const row = batch[i];
      const rowNumber = startRowNumber + i;

      try {
        const cleanedRow = this.cleanRowData(row);
        const { error, value } = bookValidationSchema.validate(cleanedRow);

        if (error) {
          this.failedRows.push({
            row_number: rowNumber,
            data: row,
            error: error.details.map(d => d.message).join('; ')
          });
          failedCount++;
          continue;
        }

        // Clean ISBN
        if (value.isbn) {
          value.isbn = value.isbn.replace(/[-\s]/g, '');
        }

        validBooks.push(value);
      } catch (err) {
        this.failedRows.push({
          row_number: rowNumber,
          data: row,
          error: err.message
        });
        failedCount++;
      }
    }

    // Bulk insert valid books
    if (validBooks.length > 0) {
      try {
        await Book.bulkCreate(validBooks, {
          ignoreDuplicates: true,
          validate: true
        });
        successCount = validBooks.length;
      } catch (error) {
        logger.error('Bulk insert failed:', error);
        // If bulk insert fails, try individual inserts
        for (const book of validBooks) {
          try {
            await Book.create(book);
            successCount++;
          } catch (err) {
            this.failedRows.push({
              row_number: 'bulk_insert',
              data: book,
              error: err.message
            });
            failedCount++;
          }
        }
      }
    }

    return { success: successCount, failed: failedCount };
  }

  cleanRowData(row) {
    return {
      title: row.title?.toString().trim() || '',
      author: row.author?.toString().trim() || '',
      genre: row.genre?.toString().trim() || null,
      price: parseFloat(row.price) || 0,
      description: row.description?.toString().trim() || null,
      isbn: row.isbn?.toString().trim() || null,
      cover_image_url: row.cover_image_url?.toString().trim() || null,
      stock: parseInt(row.stock) || 0
    };
  }

  async exportFailedRows() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `failed_imports_${timestamp}.csv`;
    const filePath = path.join(process.env.LOGS_PATH || './logs', fileName);

    // Ensure logs directory exists
    const logsDir = path.dirname(filePath);
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    const csvWriter = createCsvWriter({
      path: filePath,
      header: [
        { id: 'row_number', title: 'Row Number' },
        { id: 'title', title: 'Title' },
        { id: 'author', title: 'Author' },
        { id: 'genre', title: 'Genre' },
        { id: 'price', title: 'Price' },
        { id: 'description', title: 'Description' },
        { id: 'isbn', title: 'ISBN' },
        { id: 'cover_image_url', title: 'Cover Image URL' },
        { id: 'stock', title: 'Stock' },
        { id: 'error', title: 'Error Reason' }
      ]
    });

    const records = this.failedRows.map(row => ({
      row_number: row.row_number,
      title: row.data.title || '',
      author: row.data.author || '',
      genre: row.data.genre || '',
      price: row.data.price || '',
      description: row.data.description || '',
      isbn: row.data.isbn || '',
      cover_image_url: row.data.cover_image_url || '',
      stock: row.data.stock || '',
      error: row.error
    }));

    await csvWriter.writeRecords(records);
    logger.info(`Failed rows exported to: ${filePath}`);
    
    return filePath;
  }
}

module.exports = BookImportService;