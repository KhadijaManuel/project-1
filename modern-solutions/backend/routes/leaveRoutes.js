const express = require('express');
const router = express.Router();
const { getAllLeaveRequests, addLeaveRequest, deleteLeaveRequest, updateLeaveRequest } = require('../controllers/leaveController');

// const leaveController = require('../controllers/leaveController');
router.get('/', getAllLeaveRequests);
router.post('/', addLeaveRequest);
router.delete('/:id', deleteLeaveRequest);  
router.patch('/:id', updateLeaveRequest);

// importing leave data and adjusting the path and filename as needed
const attendanceData = require('../../frontend/public/data/attendance.json');

// getting all leaveRequests from my attendance data
router.get('/info', (req,res)=> {
    const leavelist = attendanceData.attendanceAndLeave.map(emp=>({
        employeeId: emp.employeeId,
        name: emp.name,
        leaveRequests: emp.leaveRequests
    }));
    res.json(leavelist);
})

router.get('/', (req, res) => res.send('leavelist'));

// router.get('/', (req, res) => {
//     const leavelist = [
//         {}
//     ]
// }


module.exports = router;

// http://localhost:5000/leave/info
