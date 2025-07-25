const express = require('express');
const router = express.Router();
const { getAllEmployees, addEmployee, updateEmployee, deleteEmployee } = require('../controllers/employeeController');

router.get('/info', (req, res) => {
  res.json(employee_info);
});

//all the routes for the databse and api using crud 
router.get('/', getAllEmployees);
router.post('/', addEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);


module.exports = router;
