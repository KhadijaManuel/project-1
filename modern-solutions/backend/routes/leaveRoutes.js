const express = require('express');
const router = express.Router();

// getting the requird modules
const {getAllLeaveRequests,getLeaveByEmployee,addLeaveRequest,updateLeaveRequest,deleteLeaveRequest} = require('../controllers/leaveController');

//routes using crud 
router.get('/', getAllLeaveRequests);       // GET all leave requests
router.get('/:id', getLeaveByEmployee);     // GET leave requests for a a single employee
router.post('/', addLeaveRequest);          // POST new leave request 
router.patch('/:id', updateLeaveRequest);   // PATCH (update) leave request using patch since its the same as  put but updated 
router.delete('/:id', deleteLeaveRequest);  // DELETE leave request

module.exports = router;
