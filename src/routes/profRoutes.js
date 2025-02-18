const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');
const { mustLogin } = require('../middleware/authMiddleware');

router.get('/get', mustLogin, profileController.getProfile);
router.put('/update', mustLogin, profileController.updatedProfile);

module.exports = router;
