const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());

// Parse JSON and catch malformed JSON syntax errors
app.use(express.json());
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid JSON format. Please check your request body syntax.'
    });
  }
  next();
});

// Routes
const booksRouter = require('./routes/books');
app.use('/api/books', booksRouter.router);

// Root Endpoint / Health Check
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the UAS KPL Book Management API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /',
      books: 'GET /api/books',
      bookDetails: 'GET /api/books/:id'
    }
  });
});

// 404 Route handler (Unmatched routes)
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong on the server',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running successfully on http://localhost:${PORT}`);
});
