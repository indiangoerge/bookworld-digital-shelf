const express = require('express');
const BookImportService = require('../services/bookImportService');
const OrderService = require('../services/orderService');
const { statusUpdateSchema } = require('../utils/validators');
const { adminAuth } = require('../middleware/auth');
const router = express.Router();

// Apply admin authentication to all routes
router.use(adminAuth);

const bookImportService = new BookImportService();
const orderService = new OrderService();

// POST /api/admin/import-books-from-excel - Import books from Excel
router.post('/import-books-from-excel', async (req, res, next) => {
  try {
    const result = await bookImportService.importBooksFromExcel();
    
    res.json({
      success: true,
      message: 'Book import completed',
      data: result
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/orders - Get all orders with filters
router.get('/orders', async (req, res, next) => {
  try {
    const filters = {
      status: req.query.status,
      user_id: req.query.user_id ? parseInt(req.query.user_id) : undefined,
      date_from: req.query.date_from,
      date_to: req.query.date_to,
      limit: req.query.limit ? parseInt(req.query.limit) : 100,
      offset: req.query.offset ? parseInt(req.query.offset) : 0
    };

    const orders = await orderService.getAllOrders(filters);
    
    res.json({
      success: true,
      data: orders,
      filters: filters
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/admin/orders/:order_id/status - Update order status
router.patch('/orders/:order_id/status', async (req, res, next) => {
  try {
    const orderId = parseInt(req.params.order_id);
    
    if (isNaN(orderId)) {
      return res.status(400).json({
        error: 'Invalid Parameter',
        message: 'Order ID must be a number'
      });
    }

    const { error, value } = statusUpdateSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        error: 'Validation Error',
        message: error.details.map(d => d.message).join(', ')
      });
    }

    const result = await orderService.updateOrderStatus(orderId, value.status);
    
    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/stats - Get basic statistics
router.get('/stats', async (req, res, next) => {
  try {
    const { Book, Order, User } = require('../models');
    
    const [totalBooks, totalOrders, totalUsers] = await Promise.all([
      Book.count(),
      Order.count(),
      User.count()
    ]);

    const ordersByStatus = await Order.findAll({
      attributes: [
        'status',
        [require('../config/database').fn('COUNT', require('../config/database').col('id')), 'count']
      ],
      group: ['status']
    });

    res.json({
      success: true,
      data: {
        total_books: totalBooks,
        total_orders: totalOrders,
        total_users: totalUsers,
        orders_by_status: ordersByStatus.reduce((acc, item) => {
          acc[item.status] = parseInt(item.dataValues.count);
          return acc;
        }, {})
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;