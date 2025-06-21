const express = require('express');
const { User } = require('../models');
const Joi = require('joi');
const router = express.Router();

const userValidationSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  email: Joi.string().email().required(),
  address: Joi.string().allow('', null)
});

// POST /api/users - Create new user
router.post('/', async (req, res, next) => {
  try {
    const { error, value } = userValidationSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        error: 'Validation Error',
        message: error.details.map(d => d.message).join(', ')
      });
    }

    const user = await User.create(value);
    
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:id - Get user by ID
router.get('/:id', async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId)) {
      return res.status(400).json({
        error: 'Invalid Parameter',
        message: 'User ID must be a number'
      });
    }

    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;