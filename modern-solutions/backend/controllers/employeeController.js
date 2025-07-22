const db = require('../models/db');

exports.getAllEmployees = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM employees');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  } 
};

exports.addEmployee = async (req, res) => {
  const { first_name, last_name, email, role, salary } = req.body;
  try {
    await db.query('INSERT INTO employees (first_name,last_name,email,role,salary) VALUES (?,?,?,?,?)',
      [first_name, last_name, email, role, salary]);
    res.json({ message: 'Employee added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
