const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const bookRoutes = require('./bookRoutes');

router.use('/auth', authRoutes);
router.use('/book', bookRoutes);

module.exports = router;
