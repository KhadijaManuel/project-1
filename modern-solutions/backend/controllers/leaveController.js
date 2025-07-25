const db = require('../models/db');

// GET leave requests for all employees
exports.getAllLeaveRequests = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT l.leave_id, l.employee_id, e.first_name, e.last_name, 
             l.leave_date, l.reason, l.status
      FROM leave_requests l
      JOIN employees e ON l.employee_id = e.employee_id
      ORDER BY l.leave_date DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching leave requests:', err);
    res.status(500).json({ message: 'Server error while fetching leave requests.' });
  }
};

// GET leave requests by employee_id just some extra stuff 
exports.getLeaveByEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT l.leave_id, l.employee_id, e.first_name, e.last_name, 
             l.leave_date, l.reason, l.status
      FROM leave_requests l
      JOIN employees e ON l.employee_id = e.employee_id
      WHERE l.employee_id = ?
      ORDER BY l.leave_date DESC
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No leave requests found for this employee.' });
    }
    res.json(rows);
  } catch (err) {
    console.error('Error fetching leave by employee:', err);
    res.status(500).json({ message: 'Server error while fetching leave by employee.' });
  }
};

// ADD a leave request
exports.addLeaveRequest = async (req, res) => {
  const { employee_id, leave_date, reason, status } = req.body;
  try {
    if (!employee_id || !leave_date || !reason || !status) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }
    await db.query(
      `INSERT INTO leave_requests (employee_id, leave_date, reason, status) VALUES (?, ?, ?, ?)`,
      [employee_id, leave_date, reason, status]
    );
    res.status(201).json({ message: 'Leave request added successfully.' });
  } catch (err) {
    console.error('Error adding leave request:', err);
    res.status(500).json({ message: 'Server error while adding leave request.' });
  }
};

//UPDATE leave request by leave_id
exports.updateLeaveRequest = async (req, res) => {
  const { id } = req.params;
  const { leave_date, reason, status } = req.body;

  try {
    const [existing] = await db.query(`SELECT * FROM leave_requests WHERE leave_id = ?`, [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Leave request not found.' });
    }

    const updatedLeaveDate = leave_date || existing[0].leave_date;
    const updatedReason = reason || existing[0].reason;
    const updatedStatus = status || existing[0].status;

    await db.query(
      `UPDATE leave_requests SET leave_date = ?, reason = ?, status = ? WHERE leave_id = ?`,
      [updatedLeaveDate, updatedReason, updatedStatus, id]
    );

    res.json({ message: 'Leave request updated successfully.' });
  } catch (err) {
    console.error('Error updating leave request:', err);
    res.status(500).json({ message: 'Server error while updating leave request.' });
  }
};

// DELETE leave request by leave_id
exports.deleteLeaveRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query(`DELETE FROM leave_requests WHERE leave_id = ?`, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Leave request not found.' });
    }
    res.json({ message: 'Leave request deleted successfully.' });
  } catch (err) {
    console.error(' Error deleting leave request:', err);
    res.status(500).json({ message: 'Server error while deleting leave request.' });
  }
};
