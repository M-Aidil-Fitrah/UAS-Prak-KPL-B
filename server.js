const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root Endpoint / Health Check
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the UAS KPL Book Management API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /',
      books: 'GET /api/books'
    }
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running successfully on http://localhost:${PORT}`);
});
