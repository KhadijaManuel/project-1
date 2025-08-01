const db = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register new user (employee or HR)
exports.registerUser = async (req, res) => {
  const { username, password, employee_id } = req.body;

  if (!username || !password || !employee_id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const [existing] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO users (username, password_hash, employee_id) VALUES (?, ?, ?)',
      [username, hashedPassword, employee_id]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ message: 'Registration failed', error: err.sqlMessage });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing username or password' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        employee_id: user.employee_id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
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

// Delete user
exports.deleteUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM users WHERE user_id = ?', [user_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Delete User Error:', err);
    res.status(500).json({ message: 'Failed to delete user', error: err.sqlMessage });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  const { user_id } = req.params;
  const { username, password, employee_id } = req.body;

  if (!username && !password && !employee_id) {
    return res.status(400).json({ message: 'No fields to update' });
  }

  try {
    const fields = [];
    const values = [];

    if (username) {
      fields.push('username = ?');
      values.push(username);
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      fields.push('password_hash = ?');
      values.push(hashedPassword);
    }

    if (employee_id) {
      fields.push('employee_id = ?');
      values.push(employee_id);
    }

    values.push(user_id);
    const sql = `UPDATE users SET ${fields.join(', ')} WHERE user_id = ?`;
    const [result] = await db.query(sql, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('Update User Error:', err);
    res.status(500).json({ message: 'Failed to update user', error: err.sqlMessage });
  }
};