const express = require('express');
const router = express.Router();

// Import semua route
const authRoutes = require('./authRoutes');
const bookRoutes = require('./bookRoutes');

// Gunakan route yang telah didefinisikan
router.use('/auth', authRoutes);
router.use('/book', bookRoutes);

module.exports = router;
