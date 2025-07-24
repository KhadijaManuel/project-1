// routes/payrollRoutes.js
const express = require('express');
const router = express.Router();
const { getAllPayroll, addPayroll, getPayrollByEmployee } = require('../controllers/payrollController');

router.get('/', getAllPayroll);            // GET all data from the database 
router.post('/', addPayroll);              // POST new record to the database 
router.get('/:id', getPayrollByEmployee);  // GET by employee_id from the database

module.exports = router;
