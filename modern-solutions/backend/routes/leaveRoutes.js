const express = require('express');
const router = express.Router();

// ✅ Import from leaveController, not attendanceController
const {
  getAllLeaveRequests,
  getLeaveByEmployee,
  addLeaveRequest,
  updateLeaveRequest,
  deleteLeaveRequest
} = require('../controllers/leaveController');

// ✅ Routes using CRUD
router.get('/', getAllLeaveRequests);        // GET all leave requests
router.get('/:id', getLeaveByEmployee);      // GET leave requests for a single employee
router.post('/', addLeaveRequest);           // POST new leave request
router.patch('/:id', updateLeaveRequest);    // PATCH (update) leave request
router.delete('/:id', deleteLeaveRequest);   // DELETE leave request

module.exports = router;
