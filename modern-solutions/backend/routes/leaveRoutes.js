const express = require('express');
const router = express.Router();

// Import all necessary controller functions for leave requests
const {
  getAllLeaveRequests,
  getLeaveByEmployee,
  addLeaveRequest,
  updateLeaveRequest,
  deleteLeaveRequest
} = require('../controllers/leaveController');

// You might want an authentication middleware here:
// const authenticateToken = require('../middleware/authMiddleware');

// Define routes for leave management
router.get('/', getAllLeaveRequests);             // GET all leave requests
router.get('/:id', getLeaveByEmployee);           // GET leave requests for a single employee (ID is employee_id)
router.post('/', addLeaveRequest);                // POST new leave request
router.patch('/:id', updateLeaveRequest);         // PATCH (update) leave request (ID is leave_id)
router.delete('/:id', deleteLeaveRequest);        // DELETE leave request (ID is leave_id)

// Example with authentication middleware (uncomment and ensure middleware exists)
// router.get('/', authenticateToken, getAllLeaveRequests);
// router.post('/', authenticateToken, addLeaveRequest);
// router.delete('/:id', authenticateToken, deleteLeaveRequest);
// router.patch('/:id', authenticateToken, updateLeaveRequest);

module.exports = router;