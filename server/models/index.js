const sequelize = require('../config/database');
const Book = require('./Book');
const User = require('./User');
const Order = require('./Order');
const OrderItem = require('./OrderItem');

// Define associations
User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

Book.hasMany(OrderItem, { foreignKey: 'book_id', as: 'orderItems' });
OrderItem.belongsTo(Book, { foreignKey: 'book_id', as: 'book' });

module.exports = {
  sequelize,
  Book,
  User,
  Order,
  OrderItem
};