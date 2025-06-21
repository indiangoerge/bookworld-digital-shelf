const express = require('express');
const { Book } = require('../models');
const { Op } = require('sequelize');
const router = express.Router();

// GET /api/books - Get all books with pagination and filters
router.get('/', async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      genre,
      author,
      min_price,
      max_price,
      sort_by = 'created_at',
      sort_order = 'DESC'
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const whereClause = {};

    // Search in title, author, or description
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { author: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    // Filter by genre
    if (genre) {
      whereClause.genre = { [Op.iLike]: `%${genre}%` };
    }

    // Filter by author
    if (author) {
      whereClause.author = { [Op.iLike]: `%${author}%` };
    }

    // Price range filter
    if (min_price || max_price) {
      whereClause.price = {};
      if (min_price) whereClause.price[Op.gte] = parseFloat(min_price);
      if (max_price) whereClause.price[Op.lte] = parseFloat(max_price);
    }

    const { count, rows } = await Book.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: offset,
      order: [[sort_by, sort_order.toUpperCase()]]
    });

    res.json({
      books: rows,
      pagination: {
        current_page: parseInt(page),
        total_pages: Math.ceil(count / parseInt(limit)),
        total_books: count,
        per_page: parseInt(limit)
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/books/:id - Get single book
router.get('/:id', async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Book not found'
      });
    }

    res.json(book);
  } catch (error) {
    next(error);
  }
});

module.exports = router;