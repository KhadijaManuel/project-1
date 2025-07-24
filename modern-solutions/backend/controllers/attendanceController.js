const db = require('../models/db');

// GET attendance for all employees
exports.getAllAttendance = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT a.attendance_id, a.employee_id, e.first_name, e.last_name, a.attendance_date, a.status
      FROM attendance a
      JOIN employees e ON a.employee_id = e.employee_id
      ORDER BY a.attendance_date DESC;
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add attendance record
exports.addAttendance = async (req, res) => {
  const { employee_id, attendance_date, status } = req.body;
  try {
    await db.query(
      'INSERT INTO attendance (employee_id, attendance_date, status) VALUES (?, ?, ?)',
      [employee_id, attendance_date, status]
    );
    res.json({ message: 'Attendance added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
