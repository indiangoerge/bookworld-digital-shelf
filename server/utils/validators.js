const Joi = require('joi');

const bookValidationSchema = Joi.object({
  title: Joi.string().min(1).max(500).required(),
  author: Joi.string().min(1).max(200).required(),
  genre: Joi.string().max(100).allow('', null),
  price: Joi.number().positive().precision(2).required(),
  description: Joi.string().allow('', null),
  isbn: Joi.string().pattern(/^[0-9\-\s]{10,17}$/).allow('', null),
  cover_image_url: Joi.string().uri().allow('', null),
  stock: Joi.number().integer().min(0).default(0)
});

const orderValidationSchema = Joi.object({
  user_id: Joi.number().integer().positive().required(),
  items: Joi.array().items(
    Joi.object({
      book_id: Joi.number().integer().positive().required(),
      quantity: Joi.number().integer().min(1).required()
    })
  ).min(1).required(),
  payment_method: Joi.string().max(50).required(),
  address: Joi.string().min(10).required()
});

const statusUpdateSchema = Joi.object({
  status: Joi.string().valid('pending', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled').required()
});

module.exports = {
  bookValidationSchema,
  orderValidationSchema,
  statusUpdateSchema
};