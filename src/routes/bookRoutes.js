const express = require('express');
const bookController = require('../controllers/books')

const router = express.Router();

router.post('/create', bookController.createBook);
router.get('/get-all', bookController.getAllBooks);
router.get('/:bookId', bookController.getBookById);
router.put('/updated/:bookId', bookController.updatedBook);
router.delete('/delete/:bookId', bookController.deleteBook);

module.exports = router;
