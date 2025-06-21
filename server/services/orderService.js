const { Order, OrderItem, Book, User, sequelize } = require('../models');
const logger = require('../utils/logger');

class OrderService {
  async createOrder(orderData) {
    const transaction = await sequelize.transaction();
    
    try {
      const { user_id, items, payment_method, address } = orderData;

      // Validate user exists
      const user = await User.findByPk(user_id);
      if (!user) {
        throw new Error('User not found');
      }

      // Validate books and check stock
      const bookIds = items.map(item => item.book_id);
      const books = await Book.findAll({
        where: { id: bookIds },
        transaction
      });

      if (books.length !== bookIds.length) {
        throw new Error('One or more books not found');
      }

      // Check stock and calculate total
      let totalPrice = 0;
      const orderItems = [];

      for (const item of items) {
        const book = books.find(b => b.id === item.book_id);
        
        if (book.stock < item.quantity) {
          throw new Error(`Insufficient stock for book: ${book.title}. Available: ${book.stock}, Requested: ${item.quantity}`);
        }

        const itemTotal = parseFloat(book.price) * item.quantity;
        totalPrice += itemTotal;

        orderItems.push({
          book_id: item.book_id,
          quantity: item.quantity,
          unit_price: book.price
        });

        // Update stock
        await book.update(
          { stock: book.stock - item.quantity },
          { transaction }
        );
      }

      // Create order
      const order = await Order.create({
        user_id,
        total_price: totalPrice,
        status: 'processing',
        payment_method,
        payment_status: 'paid', // Mocked as always paid
        shipping_address: address
      }, { transaction });

      // Create order items
      const orderItemsWithOrderId = orderItems.map(item => ({
        ...item,
        order_id: order.id
      }));

      await OrderItem.bulkCreate(orderItemsWithOrderId, { transaction });

      await transaction.commit();

      logger.info(`Order created successfully: ${order.id}`);

      return {
        order_id: order.id,
        status: order.status,
        total_price: parseFloat(order.total_price),
        payment_status: order.payment_status
      };

    } catch (error) {
      await transaction.rollback();
      logger.error('Order creation failed:', error);
      throw error;
    }
  }

  async getUserOrders(userId) {
    const orders = await Order.findAll({
      where: { user_id: userId },
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [
            {
              model: Book,
              as: 'book',
              attributes: ['id', 'title', 'author', 'cover_image_url']
            }
          ]
        }
      ],
      order: [['created_at', 'DESC']]
    });

    return orders.map(order => ({
      id: order.id,
      total_price: parseFloat(order.total_price),
      status: order.status,
      payment_status: order.payment_status,
      payment_method: order.payment_method,
      shipping_address: order.shipping_address,
      created_at: order.created_at,
      updated_at: order.updated_at,
      items: order.items.map(item => ({
        id: item.id,
        quantity: item.quantity,
        unit_price: parseFloat(item.unit_price),
        book: item.book
      }))
    }));
  }

  async updateOrderStatus(orderId, newStatus) {
    const order = await Order.findByPk(orderId);
    
    if (!order) {
      throw new Error('Order not found');
    }

    // Validate status transition
    const validTransitions = {
      'pending': ['processing', 'cancelled'],
      'processing': ['shipped', 'cancelled'],
      'shipped': ['out_for_delivery', 'delivered'],
      'out_for_delivery': ['delivered'],
      'delivered': [],
      'cancelled': []
    };

    if (!validTransitions[order.status].includes(newStatus)) {
      throw new Error(`Invalid status transition from ${order.status} to ${newStatus}`);
    }

    await order.update({ status: newStatus });
    
    logger.info(`Order ${orderId} status updated to ${newStatus}`);
    
    return {
      order_id: order.id,
      old_status: order.status,
      new_status: newStatus,
      updated_at: order.updated_at
    };
  }

  async getAllOrders(filters = {}) {
    const whereClause = {};
    
    if (filters.status) {
      whereClause.status = filters.status;
    }
    
    if (filters.user_id) {
      whereClause.user_id = filters.user_id;
    }

    if (filters.date_from) {
      whereClause.created_at = {
        [sequelize.Op.gte]: new Date(filters.date_from)
      };
    }

    if (filters.date_to) {
      whereClause.created_at = {
        ...whereClause.created_at,
        [sequelize.Op.lte]: new Date(filters.date_to)
      };
    }

    const orders = await Order.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        },
        {
          model: OrderItem,
          as: 'items',
          include: [
            {
              model: Book,
              as: 'book',
              attributes: ['id', 'title', 'author']
            }
          ]
        }
      ],
      order: [['created_at', 'DESC']],
      limit: filters.limit || 100,
      offset: filters.offset || 0
    });

    return orders.map(order => ({
      id: order.id,
      user: order.user,
      total_price: parseFloat(order.total_price),
      status: order.status,
      payment_status: order.payment_status,
      payment_method: order.payment_method,
      shipping_address: order.shipping_address,
      created_at: order.created_at,
      updated_at: order.updated_at,
      items_count: order.items.length,
      items: order.items.map(item => ({
        quantity: item.quantity,
        unit_price: parseFloat(item.unit_price),
        book: item.book
      }))
    }));
  }
}

module.exports = OrderService;