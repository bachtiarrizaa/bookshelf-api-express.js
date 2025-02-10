const express = require('express');
const router = express.Router();
const bookRoutes = require('./bookRoutes');

router.use('/book', bookRoutes);

module.exports = router;
