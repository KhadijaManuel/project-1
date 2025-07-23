// routes/payrollRoutes.js
const express = require('express');
const router = express.Router();
const { getAllPayroll, addPayroll, getPayrollByEmployee } = require('../controllers/payrollController');

const payrollData = require('../../frontend/public/data/payroll_data.json');

// this gets all the JSON data for payroll
// adjust the path and filename as needed
router.get('/info', (req, res)=> {
    res.json(payrollData);
});

router.get('/', getAllPayroll);            // GET all
router.post('/', addPayroll);              // POST new record
router.get('/:id', getPayrollByEmployee);  // GET by employee_id

module.exports = router;

// http://localhost:5000/payroll/info