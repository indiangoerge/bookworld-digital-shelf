const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 500]
    }
  },
  author: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 200]
    }
  },
  genre: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0.01,
      isDecimal: true
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  isbn: {
    type: DataTypes.STRING(13),
    allowNull: true,
    unique: true,
    validate: {
      isISBN(value) {
        if (value && !/^[0-9]{10}$|^[0-9]{13}$/.test(value.replace(/[-\s]/g, ''))) {
          throw new Error('ISBN must be 10 or 13 digits');
        }
      }
    }
  },
  cover_image_url: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      isUrl: {
        msg: 'Must be a valid URL'
      }
    }
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
}, {
  tableName: 'books',
  indexes: [
    { fields: ['title'] },
    { fields: ['author'] },
    { fields: ['genre'] },
    { fields: ['isbn'], unique: true },
    { fields: ['price'] }
  ]
});

module.exports = Book;