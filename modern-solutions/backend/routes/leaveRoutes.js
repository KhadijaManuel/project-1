const express = require('express');
const router = express.Router();

// Importing all necessary controller functions for leave requests
const {
  getAllLeaveRequests,
  getLeaveByEmployee,
  addLeaveRequest,
  updateLeaveRequest,
  deleteLeaveRequest
} = require('../controllers/leaveController');


// const authenticateToken = require('../middleware/authMiddleware');

// Define routes for leave management
router.get('/', getAllLeaveRequests);             // GET all leave requests
router.get('/:id', getLeaveByEmployee);           // GET leave requests for a single employee (ID is employee_id)
router.post('/', addLeaveRequest);                // POST new leave request
router.patch('/:id', updateLeaveRequest);         // PATCH (update) leave request (ID is leave_id)
router.delete('/:id', deleteLeaveRequest);        // DELETE leave request (ID is leave_id)



module.exports = router;