const logger = require('../utils/logger');

const adminAuth = (req, res, next) => {
  const apiKey = req.headers['x-admin-api-key'] || req.query.admin_key;
  
  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
    logger.warn('Unauthorized admin access attempt', {
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
    
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Valid admin API key required'
    });
  }
  
  next();
};

module.exports = {
  adminAuth
};