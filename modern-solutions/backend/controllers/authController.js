// controllers/authController.js
const db = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/*
  REGISTER a new user using POST
  Expects: { username, password, employee_id } in the format 
  {
  "username": "john_doe",
  "password": "secret123",
  "employee_id": "002"
}
 */
exports.registerUser = async (req, res) => {
  const { username, password, employee_id } = req.body;

  if (!username || !password || !employee_id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Check if username already exists
    const [existing] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Username already taken' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user
    await db.query(
      'INSERT INTO users (username, password_hash, employee_id) VALUES (?, ?, ?)',
      [username, hashedPassword, employee_id]
    );

    res.status(201).json({ message: ' User registered successfully' });
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ message: 'Registration failed', error: err.sqlMessage });
  }
};

/**
 * LOGIN user
 * Expects: { username, password } in the fromat 
 * {
  "username": "john_doe",
  "password": "secret123",
  "employee_id": "002"
}
 * Returns: JWT token when it is successful and add the data in the database 
 */
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing username or password' });
  }

  try {
    // Find user by username
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        user_id: user.user_id,
        employee_id: user.employee_id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // token valid for 1 hour
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        user_id: user.user_id,
        username: user.username,
        employee_id: user.employee_id,
      },
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Login failed', error: err.sqlMessage });
  }
};
