const express = require('express');
const OrderService = require('../services/orderService');
const { orderValidationSchema } = require('../utils/validators');
const router = express.Router();

const orderService = new OrderService();

// POST /api/orders - Create new order
router.post('/', async (req, res, next) => {
  try {
    const { error, value } = orderValidationSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        error: 'Validation Error',
        message: error.details.map(d => d.message).join(', ')
      });
    }

    const order = await orderService.createOrder(value);
    
    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/orders/:user_id - Get user's orders
router.get('/:user_id', async (req, res, next) => {
  try {
    const userId = parseInt(req.params.user_id);
    
    if (isNaN(userId)) {
      return res.status(400).json({
        error: 'Invalid Parameter',
        message: 'User ID must be a number'
      });
    }

    const orders = await orderService.getUserOrders(userId);
    
    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;