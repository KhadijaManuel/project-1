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

// UPDATE payroll record by payroll_id (only update passed fields)
exports.updatePayroll = async (req, res) => {
  const { id } = req.params;
  const { base_salary, deductions, net_pay, hours_worked, leave_deductions } = req.body;

  try {
    // Fetch current record
    const [existingRows] = await db.query('SELECT * FROM payroll WHERE payroll_id = ?', [id]);
    if (existingRows.length === 0) {
      return res.status(404).json({ message: 'Payroll record not found.' });
    }

    const existing = existingRows[0];

    // Use existing values if fields are not provided in request
    const updatedBaseSalary = base_salary !== undefined ? base_salary : existing.base_salary;
    const updatedDeductions = deductions !== undefined ? deductions : existing.deductions;
    const updatedNetPay = net_pay !== undefined ? net_pay : existing.net_pay;
    const updatedHoursWorked = hours_worked !== undefined ? hours_worked : existing.hours_worked;
    const updatedLeaveDeductions = leave_deductions !== undefined ? leave_deductions : existing.leave_deductions;

    // Update the record
    await db.query(
      `UPDATE payroll 
       SET base_salary = ?, deductions = ?, net_pay = ?, hours_worked = ?, leave_deductions = ?
       WHERE payroll_id = ?`,
      [
        updatedBaseSalary,
        updatedDeductions,
        updatedNetPay,
        updatedHoursWorked,
        updatedLeaveDeductions,
        id
      ]
    );

    res.json({ message: 'Payroll record updated successfully.' });
  } catch (err) {
    console.error('Error updating payroll record:', err);
    res.status(500).json({ message: 'Server error while updating payroll record.' });
  }
};

// DELETE payroll record by payroll_id
exports.deletePayroll = async (req, res) => {
  const { id } = req.params;

  try {
    const [existing] = await db.query('SELECT * FROM payroll WHERE payroll_id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Payroll record not found.' });
    }

    await db.query('DELETE FROM payroll WHERE payroll_id = ?', [id]);

    res.json({ message: 'Payroll record deleted successfully.' });
  } catch (err) {
    console.error('Error deleting payroll record:', err);
    res.status(500).json({ message: 'Server error while deleting payroll record.' });
  }
};
