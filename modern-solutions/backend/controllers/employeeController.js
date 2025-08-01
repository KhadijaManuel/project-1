const db = require('../models/db');

// validates email ends with @moderntech.com
const isValidEmail = (email) =>
  /^[^\s@]+@moderntech\.com$/.test(email);

// Fetch all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM employees');
    res.json(rows);
  } catch (err) {
    console.error('getAllEmployees error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add new employee
exports.addEmployee = async (req, res) => {
  const { first_name, last_name, email, role, salary } = req.body;

  
  if (!first_name || !last_name || !email || !role || salary == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Email must end with @moderntech.com' });
  }

  try {
    // Check for duplicate email
    const [existing] = await db.query('SELECT email FROM employees WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Employee with this email already exists' });
    }

    // Insert new employee into database
    const [result] = await db.query(
      'INSERT INTO employees (first_name, last_name, email, role, salary) VALUES (?, ?, ?, ?, ?)',
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

// update existing employee
exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, role, salary } = req.body;

  try {
    // vheck if employee exists
    const [existingRows] = await db.query('SELECT * FROM employees WHERE employee_id = ?', [id]);
    if (existingRows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const existing = existingRows[0];

    // prepare updated values
    const updatedFirstName = first_name ?? existing.first_name;
    const updatedLastName = last_name ?? existing.last_name;
    const updatedEmail = email ?? existing.email;
    const updatedRole = role ?? existing.role;
    const updatedSalary = salary ?? existing.salary;
 // If email is changed, validate and check for duplicates
    if (email && email !== existing.email) {
      if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Email must end with @moderntech.com' });
      }

      const [emailCheck] = await db.query(
        'SELECT * FROM employees WHERE email = ? AND employee_id != ?',
        [email, id]
      );
      if (emailCheck.length > 0) {
        return res.status(400).json({ message: 'Another employee with this email already exists' });
      }
    }

   
    await db.query(
      'UPDATE employees SET first_name = ?, last_name = ?, email = ?, role = ?, salary = ? WHERE employee_id = ?',
      [updatedFirstName, updatedLastName, updatedEmail, updatedRole, updatedSalary, id]
    );

    res.json({ message: 'Employee updated successfully' });
  } catch (err) {
    console.error('updateEmployee error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// delete employee by ID
exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM employees WHERE employee_id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error('deleteEmployee error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};