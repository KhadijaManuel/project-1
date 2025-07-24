const express = require('express');
const router = express.Router();
const { getAllLeaveRequests, addLeaveRequest, deleteLeaveRequest, updateLeaveRequest } = require('../controllers/leaveController');

// const leaveController = require('../controllers/leaveController');
router.get('/', getAllLeaveRequests);
router.post('/', addLeaveRequest);
router.delete('/:id', deleteLeaveRequest);  
router.patch('/:id', updateLeaveRequest);

module.exports = router;
