// controllers/authController.js
const db = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
  const { username, password, employee_id } = req.body;
  try {
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // insert into users table
    await db.query(
      'INSERT INTO users (username, password_hash, employee_id) VALUES (?,?,?)',
      [username, hashedPassword, employee_id]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed', error: err.sqlMessage });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    // find user
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = rows[0];

    // compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // generate JWT
    const token = jwt.sign(
      { user_id: user.user_id, employee_id: user.employee_id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed', error: err.sqlMessage });
  }
};
