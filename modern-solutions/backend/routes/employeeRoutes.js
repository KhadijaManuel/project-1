const express = require('express');
const router = express.Router();
const { getAllEmployees, addEmployee } = require('../controllers/employeeController');

const employee_info = require('../../frontend/public/data/employee_info.json');

router.get('/info', (req, res) => {
  res.json(employee_info);
});

router.get('/', getAllEmployees);
router.post('/', addEmployee);

module.exports = router;

// http://localhost:5000/employees/info
