const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { mustLogin } = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', mustLogin, authController.logout);

module.exports = router;