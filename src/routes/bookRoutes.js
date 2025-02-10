const express = require('express');
const bookController = require('../controllers/books')

const router = express.Router();

router.post('/create', bookController.createBook);
router.get('/get-all', bookController.getAllBooks);

module.exports = router;
