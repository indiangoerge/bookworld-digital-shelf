const { sequelize } = require('../models');
const logger = require('../utils/logger');

async function setupDatabase() {
  try {
    logger.info('Setting up database...');
    
    // Test connection
    await sequelize.authenticate();
    logger.info('Database connection established');
    
    // Create/update tables
    await sequelize.sync({ force: false, alter: true });
    logger.info('Database tables created/updated successfully');
    
    // Create indexes
    await sequelize.query(`
      CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_books_title_search 
      ON books USING gin(to_tsvector('english', title));
    `);
    
    await sequelize.query(`
      CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_books_author_search 
      ON books USING gin(to_tsvector('english', author));
    `);
    
    logger.info('Search indexes created');
    
    process.exit(0);
  } catch (error) {
    logger.error('Database setup failed:', error);
    process.exit(1);
  }
}

setupDatabase();