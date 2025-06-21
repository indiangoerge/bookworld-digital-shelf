# Bookworld Backend - Complete eCommerce System

A scalable Node.js backend for book eCommerce with bulk import capabilities and order management.

## 🚀 Features

### Module 1: Bulk Book Import
- Import 100,000+ books from Excel files
- Batch processing (500 rows per batch)
- Data validation and error handling
- Failed rows exported to CSV with error reasons
- CLI script and API endpoint support

### Module 2: Order Management
- Complete order placement system
- Stock validation and management
- Mocked payment system (always "paid")
- Order status tracking with valid transitions
- Admin order management

## 🛠️ Technology Stack

- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Sequelize ORM
- **Excel Processing**: xlsx library
- **Validation**: Joi
- **Logging**: Winston
- **Security**: Helmet, CORS, Rate limiting

## 📦 Installation

1. **Clone and install dependencies:**
```bash
cd server
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. **Set up PostgreSQL database:**
```bash
# Create database
createdb bookworld_db

# Run database setup
npm run setup-db
```

4. **Start the server:**
```bash
# Development
npm run dev

# Production
npm start
```

## 📊 Database Schema

### Books Table
```sql
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  genre VARCHAR(100),
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  isbn VARCHAR(13) UNIQUE,
  cover_image_url TEXT,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Orders & Related Tables
- `users` - Customer information
- `orders` - Order details with status tracking
- `order_items` - Individual items in each order

## 📚 API Endpoints

### Public APIs

#### Books
- `GET /api/books` - Get books with pagination and filters
- `GET /api/books/:id` - Get single book details

#### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:user_id` - Get user's orders

#### Users
- `POST /api/users` - Create new user
- `GET /api/users/:id` - Get user details

### Admin APIs (Require API Key)

#### Book Import
- `POST /api/admin/import-books-from-excel` - Import books from Excel

#### Order Management
- `GET /api/admin/orders` - Get all orders with filters
- `PATCH /api/admin/orders/:id/status` - Update order status

#### Statistics
- `GET /api/admin/stats` - Get system statistics

## 📥 Book Import Process

### 1. Excel File Format
Place your Excel file at `/server/uploads/books.xlsx` with columns:
```
title | author | genre | price | description | isbn | cover_image_url | stock
```

### 2. Import Methods

**CLI Script:**
```bash
npm run import-books
```

**API Endpoint:**
```bash
curl -X POST http://localhost:3000/api/admin/import-books-from-excel \
  -H "X-Admin-API-Key: admin123"
```

### 3. Validation Rules
- **Title, Author, Price**: Required fields
- **Price**: Must be > 0
- **ISBN**: 10 or 13 digits (optional)
- **Stock**: Defaults to 0 if missing
- **Image URL**: Must be valid URL if provided

### 4. Error Handling
- Failed rows exported to `/logs/failed_imports_TIMESTAMP.csv`
- Detailed error reasons for each failed row
- Batch processing prevents memory issues

## 🛒 Order Placement Flow

### 1. Create Order
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "items": [
      {"book_id": 101, "quantity": 2},
      {"book_id": 202, "quantity": 1}
    ],
    "payment_method": "UPI",
    "address": "123 Main St, City, State"
  }'
```

### 2. Order Status Transitions
```
pending → processing → shipped → out_for_delivery → delivered
       ↘ cancelled
```

### 3. Stock Management
- Automatic stock deduction on order creation
- Stock validation before order placement
- Transaction-based operations for data consistency

## 🔐 Authentication

### Admin API Key
Set `X-Admin-API-Key` header or `admin_key` query parameter:
```bash
curl -H "X-Admin-API-Key: admin123" http://localhost:3000/api/admin/orders
```

## 📝 Logging

### Log Files
- `/logs/error.log` - Error logs
- `/logs/combined.log` - All logs
- `/logs/failed_imports_*.csv` - Failed import rows

### Log Levels
- **INFO**: General operations
- **ERROR**: Errors and exceptions
- **WARN**: Security warnings

## 🧪 Testing

### Sample API Calls

**Create User:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "address": "123 Main St"}'
```

**Get Books:**
```bash
curl "http://localhost:3000/api/books?page=1&limit=10&search=atomic"
```

**Admin Stats:**
```bash
curl -H "X-Admin-API-Key: admin123" http://localhost:3000/api/admin/stats
```

## 🚀 Production Deployment

### Environment Variables
```bash
NODE_ENV=production
DB_HOST=your_db_host
DB_PASSWORD=secure_password
ADMIN_API_KEY=secure_admin_key
```

### Performance Optimizations
- Database indexes on search fields
- Connection pooling
- Rate limiting
- Batch processing for imports

## 📋 TODO / Future Enhancements

- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Email notifications for order updates
- [ ] Inventory alerts for low stock
- [ ] Advanced search with Elasticsearch
- [ ] API documentation with Swagger
- [ ] Unit and integration tests
- [ ] Docker containerization
- [ ] Redis caching for frequently accessed data

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check PostgreSQL is running
   - Verify credentials in `.env`
   - Ensure database exists

2. **Excel Import Fails**
   - Check file exists at specified path
   - Verify Excel format matches expected columns
   - Check logs for specific validation errors

3. **Order Creation Fails**
   - Verify user exists
   - Check book stock availability
   - Validate request format

### Support
Check logs in `/logs/` directory for detailed error information.

## 📄 License

MIT License - see LICENSE file for details.