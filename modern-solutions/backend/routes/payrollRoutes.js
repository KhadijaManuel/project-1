// routes/payrollRoutes.js
const express = require('express');
const router = express.Router();
const { getAllPayroll, addPayroll, getPayrollByEmployee, updatePayroll, deletePayroll } = require('../controllers/payrollController');
const authenticateToken = require('../middleware/authMiddleware');
// Protect this route

router.get('/', getAllPayroll);// GET all data from the database 
//router.get('/', authenticateToken, getAllPayroll);  makes the route 
router.post('/', addPayroll);              // POST new record to the database 
router.get('/:id', getPayrollByEmployee);  // GET by employee_id from the database for a specfic person 
router.put('/:id', updatePayroll);         // UPDATE by employee_id from the database for a sepfic person 
router.delete('/:id', deletePayroll);      // DELETE by employees_id from the datbase for a spefic person 

module.exports = router;

