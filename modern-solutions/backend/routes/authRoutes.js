// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/register', registerUser)
router.post('/register', registerUser);// addes a users in the database and hashes the password given 
router.post('/login', loginUser);// users logins in the databse with the creds added and the hash token
module.exports = router;
