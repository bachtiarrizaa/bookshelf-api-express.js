const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const bookRoutes = require('./bookRoutes');
const profileRoutes = require('./profRoutes');

router.use('/auth', authRoutes);
router.use('/book', bookRoutes);
router.use('/profile', profileRoutes);

module.exports = router;
