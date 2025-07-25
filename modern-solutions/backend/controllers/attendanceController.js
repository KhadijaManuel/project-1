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

// Update attendance record, with Date Restriction (last 3d)
exports.updateAttendance = async (req, res) => {
  const { id } = req.params;
  const { attendance_date, status } = req.body;

  try {
    const [existing] = await db.query('SELECT * FROM attendance WHERE attendance_id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Attendance record not found.' });
    }

    const recordDate = new Date(existing[0].attendance_date).toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];

    if (recordDate !== today) {
      return res.status(403).json({ message: 'Attendance can only be updated on the same day it was recorded.' });
    }

    const updated = {
      attendance_date: attendance_date ?? existing[0].attendance_date,
      status: status ?? existing[0].status
    };

    await db.query(
      'UPDATE attendance SET attendance_date = ?, status = ? WHERE attendance_id = ?',
      [updated.attendance_date, updated.status, id]
    );

    res.json({ message: 'Attendance updated successfully.' });
  } catch (err) {
    console.error('updateAttendance error:', err);
    res.status(500).json({ message: 'Server error while updating attendance.' });
  }
};

// Delete attendance record
exports.deleteAttendance = async (req, res) => {
  const { id } = req.params;
  try {
    const [existing] = await db.query('SELECT * FROM attendance WHERE attendance_id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Attendance record not found.' });
    }

    await db.query('DELETE FROM attendance WHERE attendance_id = ?', [id]);
    res.json({ message: 'Attendance deleted successfully.' });
  } catch (err) {
    console.error('deleteAttendance error:', err);
    res.status(500).json({ message: 'Server error while deleting attendance.' });
  }
};
