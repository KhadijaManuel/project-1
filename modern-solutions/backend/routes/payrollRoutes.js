// routes/payrollRoutes.js
const express = require('express');
const router = express.Router();
const { getAllPayroll, addPayroll, getPayrollByEmployee } = require('../controllers/payrollController');

router.get('/', getAllPayroll);            // GET all
router.post('/', addPayroll);              // POST new record
router.get('/:id', getPayrollByEmployee);  // GET by employee_id

module.exports = router;
