const BookImportService = require('../services/bookImportService');
const logger = require('../utils/logger');
const { sequelize } = require('../models');

async function importBooks() {
  try {
    logger.info('Starting book import script...');
    
    // Ensure database connection
    await sequelize.authenticate();
    
    const bookImportService = new BookImportService();
    const result = await bookImportService.importBooksFromExcel();
    
    console.log('\n=== IMPORT SUMMARY ===');
    console.log(`Total rows processed: ${result.totalRows}`);
    console.log(`Successful imports: ${result.successful}`);
    console.log(`Failed imports: ${result.failed}`);
    console.log(`Failed rows exported: ${result.failedRowsExported ? 'Yes' : 'No'}`);
    console.log('=====================\n');
    
    process.exit(0);
  } catch (error) {
    logger.error('Book import script failed:', error);
    console.error('Import failed:', error.message);
    process.exit(1);
  }
}

// Handle command line arguments
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Usage: node importBooks.js [options]

Options:
  --help, -h    Show this help message

Environment Variables:
  EXCEL_UPLOAD_PATH    Path to Excel file (default: ./uploads/books.xlsx)
  LOGS_PATH           Path to logs directory (default: ./logs)

Example:
  node importBooks.js
  EXCEL_UPLOAD_PATH=/path/to/books.xlsx node importBooks.js
  `);
  process.exit(0);
}

importBooks();