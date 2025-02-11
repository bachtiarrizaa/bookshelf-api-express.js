const express = require('express');
const bookController = require('../controllers/books');
const { mustLogin, mustAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', mustAdmin, bookController.createBook);
router.get('/get-all', mustLogin, bookController.getAllBooks);
router.get('/:bookId', mustLogin, bookController.getBookById);
router.put('/updated/:bookId', mustAdmin, bookController.updatedBook);
router.delete('/delete/:bookId', mustAdmin, bookController.deleteBook);

module.exports = router;
