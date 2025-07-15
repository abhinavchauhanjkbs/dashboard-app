const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// @route   POST /api/auth/signup
// @desc    Register a new user
router.post('/signup', signup);

// @route   POST /api/auth/login
// @desc    Authenticate user and return token
router.post('/login', login);

// Optional: Simple route to test this router directly
router.get('/test', (req, res) => {
  res.send('Auth route working ✅');
});

module.exports = router;
