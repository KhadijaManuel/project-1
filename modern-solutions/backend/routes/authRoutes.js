
// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, deleteUser, updateUser } = require('../controllers/authController');

// Register user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);
// delete user 
router.delete('/:user_id', deleteUser);
// update user 
router.put('/:user_id', updateUser);

module.exports = router;