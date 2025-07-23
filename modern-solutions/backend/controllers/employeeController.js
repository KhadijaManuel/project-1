const db = require('../models/db');

exports.getAllEmployees = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM employees');
    res.json(rows);
  } catch (err) {
    console.error(' getAllEmployees error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addEmployee = async (req, res) => {
  const { first_name, last_name, email, role, salary } = req.body;

  // check that the data is all present 
  if (!first_name || !last_name || !email || !role || salary == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check for duplicate email and has a error validation that will 
    const [existing] = await db.query('SELECT email FROM employees WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Employee with this email already exists' });
    }

    // Insert employee
    const [result] = await db.query(
      'INSERT INTO employees (first_name, last_name, email, role, salary) VALUES (?,?,?,?,?)',
      [first_name, last_name, email, role, salary]
    );

    res.status(201).json({
      message: 'Employee added successfully',
      employee_id: result.insertId
    });
  } catch (err) {
    console.error('addEmployee error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
