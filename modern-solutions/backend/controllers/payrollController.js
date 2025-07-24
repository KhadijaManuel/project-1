const db = require('../models/db');

// GET all payroll data
exports.getAllPayroll = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.payroll_id, p.employee_id, e.first_name, e.last_name, 
             p.base_salary, p.deductions, p.net_pay, p.hours_worked, p.leave_deductions
      FROM payroll p
      JOIN employees e ON p.employee_id = e.employee_id
    `);
    res.status(200).json(rows);
  } catch (err) {
    console.error(' Error fetching payroll data:', err);
    res.status(500).json({ message: 'Server error while fetching payroll data.' });// try catch that will run if any row or colloum is called that does not exist in the database 
  }
};

// POST a new payroll record
exports.addPayroll = async (req, res) => {
  try {
    const { employee_id, base_salary, deductions, net_pay, hours_worked, leave_deductions } = req.body;

    //validation to make sure the database api does not crash the server when ran and the feilds are empty  
    if (!employee_id || base_salary == null || deductions == null || net_pay == null) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    //the query for the data and turing it into a string to display
    const [result] = await db.query(
      `INSERT INTO payroll (employee_id, base_salary, deductions, net_pay${hours_worked !== undefined ? ', hours_worked' : ''}${leave_deductions !== undefined ? ', leave_deductions' : ''})
       VALUES (? , ? , ? , ?${hours_worked !== undefined ? ', ?' : ''}${leave_deductions !== undefined ? ', ?' : ''})`,
      hours_worked !== undefined && leave_deductions !== undefined
        ? [employee_id, base_salary, deductions, net_pay, hours_worked, leave_deductions]
        : hours_worked !== undefined
          ? [employee_id, base_salary, deductions, net_pay, hours_worked]
          : leave_deductions !== undefined
            ? [employee_id, base_salary, deductions, net_pay, leave_deductions]
            : [employee_id, base_salary, deductions, net_pay]
    );
    //message with try catch error handling 
    res.status(201).json({ message: 'Payroll record added successfully!', payroll_id: result.insertId });
  } catch (err) {
    console.error(' Error adding payroll record:', err);
    res.status(500).json({ message: 'Server error while adding payroll record.' });
  }
};

// GET payroll data by employee_id as a cool feature 
exports.getPayrollByEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(
      `SELECT p.*, e.first_name, e.last_name
       FROM payroll p
       JOIN employees e ON p.employee_id = e.employee_id
       WHERE p.employee_id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No payroll record found for this employee.' });
    }

    res.status(200).json(rows);
  } catch (err) {
    console.error(' Error fetching payroll for employee:', err);
    res.status(500).json({ message: 'Server error while fetching payroll record.' });
  }
};
