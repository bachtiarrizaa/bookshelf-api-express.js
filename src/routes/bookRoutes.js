const express = require('express');
const { addBook, getAllBooks } = require('../controllers/bookController');

const router = express.Router();

// Route untuk menambahkan buku
router.post('/books', addBook);
router.get('/books', getAllBooks);

module.exports = router;
