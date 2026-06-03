const express = require('express');
const router = express.Router();

// Mock database (In-memory storage)
let books = [
  {
    id: 1,
    judul: "Clean Code",
    penulis: "Robert C. Martin",
    tahun: 2008,
    genre: "Programming",
    stok: 10
  },
  {
    id: 2,
    judul: "The Pragmatic Programmer",
    penulis: "Andrew Hunt, David Thomas",
    tahun: 1999,
    genre: "Programming",
    stok: 7
  },
  {
    id: 3,
    judul: "Refactoring",
    penulis: "Martin Fowler",
    tahun: 2018,
    genre: "Software Design",
    stok: 5
  }
];

// Endpoint 1: GET All Books
// GET /api/books
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Books retrieved successfully',
    data: books
  });
});

// Endpoint 2: GET Book by ID
// GET /api/books/:id
router.get('/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({
      status: 'error',
      message: `Book with ID ${bookId} not found`
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'Book retrieved successfully',
    data: book
  });
});

// Endpoint 3: POST Create Book
// POST /api/books
router.post('/', (req, res) => {
  const { judul, penulis, tahun, genre, stok } = req.body;

  // Validation
  if (!judul || typeof judul !== 'string' || judul.trim() === '') {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed: "judul" is required and must be a non-empty string'
    });
  }

  if (!penulis || typeof penulis !== 'string' || penulis.trim() === '') {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed: "penulis" is required and must be a non-empty string'
    });
  }

  if (tahun === undefined || typeof tahun !== 'number' || isNaN(tahun)) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed: "tahun" is required and must be a number'
    });
  }

  if (genre === undefined || typeof genre !== 'string' || genre.trim() === '') {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed: "genre" is required and must be a non-empty string'
    });
  }

  if (stok === undefined || typeof stok !== 'number' || isNaN(stok)) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed: "stok" is required and must be a number'
    });
  }

  const newId = books.length > 0 ? books[books.length - 1].id + 1 : 1;
  const newBook = {
    id: newId,
    judul: judul.trim(),
    penulis: penulis.trim(),
    tahun,
    genre: genre.trim(),
    stok
  };

  books.push(newBook);

  res.status(201).json({
    status: 'success',
    message: 'Book created successfully',
    data: newBook
  });
});

// Endpoint 4: PUT Update Book (Full Update)
// PUT /api/books/:id
router.put('/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({
      status: 'error',
      message: `Book with ID ${bookId} not found`
    });
  }

  const { judul, penulis, tahun, genre, stok } = req.body;

  // Validation (Since PUT is full update, all fields must be validated)
  if (!judul || typeof judul !== 'string' || judul.trim() === '') {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed: "judul" is required and must be a non-empty string'
    });
  }

  if (!penulis || typeof penulis !== 'string' || penulis.trim() === '') {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed: "penulis" is required and must be a non-empty string'
    });
  }

  if (tahun === undefined || typeof tahun !== 'number' || isNaN(tahun)) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed: "tahun" is required and must be a number'
    });
  }

  if (genre === undefined || typeof genre !== 'string' || genre.trim() === '') {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed: "genre" is required and must be a non-empty string'
    });
  }

  if (stok === undefined || typeof stok !== 'number' || isNaN(stok)) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed: "stok" is required and must be a number'
    });
  }

  // Update the book
  books[bookIndex] = {
    id: bookId,
    judul: judul.trim(),
    penulis: penulis.trim(),
    tahun,
    genre: genre.trim(),
    stok
  };

  res.status(200).json({
    status: 'success',
    message: 'Book updated successfully (Full Update)',
    data: books[bookIndex]
  });
});

// Endpoint 5: PATCH Update Book (Partial Update)
// PATCH /api/books/:id
router.patch('/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({
      status: 'error',
      message: `Book with ID ${bookId} not found`
    });
  }

  const { judul, penulis, tahun, genre, stok } = req.body;

  // Partial Validation
  if (judul !== undefined) {
    if (typeof judul !== 'string' || judul.trim() === '') {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed: "judul" must be a non-empty string'
      });
    }
    book.judul = judul.trim();
  }

  if (penulis !== undefined) {
    if (typeof penulis !== 'string' || penulis.trim() === '') {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed: "penulis" must be a non-empty string'
      });
    }
    book.penulis = penulis.trim();
  }

  if (tahun !== undefined) {
    if (typeof tahun !== 'number' || isNaN(tahun)) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed: "tahun" must be a number'
      });
    }
    book.tahun = tahun;
  }

  if (genre !== undefined) {
    if (typeof genre !== 'string' || genre.trim() === '') {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed: "genre" must be a non-empty string'
      });
    }
    book.genre = genre.trim();
  }

  if (stok !== undefined) {
    if (typeof stok !== 'number' || isNaN(stok)) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed: "stok" must be a number'
      });
    }
    book.stok = stok;
  }

  res.status(200).json({
    status: 'success',
    message: 'Book updated successfully (Partial Update)',
    data: book
  });
});

module.exports = {
  router,
  books // Export books array for other route operations (POST, PUT, DELETE)
};


