-- Create the database if not exists
CREATE DATABASE IF NOT EXISTS modern_tech_solutions;
USE modern_tech_solutions;

-- Drop and create employees table
DROP TABLE IF EXISTS employees;
CREATE TABLE employees (
  employee_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(70) NOT NULL,
  last_name VARCHAR(45) NOT NULL,
  role VARCHAR(70) NOT NULL,
  department VARCHAR(45) NOT NULL,
  salary DECIMAL(8,2) NOT NULL,
  email VARCHAR(45) NOT NULL,
  PRIMARY KEY (employee_id)
) ;

-- Drop and create payroll table
DROP TABLE IF EXISTS payroll;
CREATE TABLE payroll (
  employee_id INT NOT NULL,
  first_name VARCHAR(70) NOT NULL,
  last_name VARCHAR(45) NOT NULL,
  payrollcol VARCHAR(45) DEFAULT NULL,
  hourly_rate VARCHAR(45) DEFAULT NULL,
  hours_worked VARCHAR(45) DEFAULT NULL,
  leave_deductions DECIMAL(10,2) DEFAULT NULL,
  net_pay DECIMAL(8,2) DEFAULT NULL,
  final_salary DECIMAL(8,2) DEFAULT NULL,
  UNIQUE KEY employee_id_UNIQUE (employee_id)
) ;

-- Drop and create users_login table
CREATE TABLE users_login (
  username VARCHAR(255) NOT NULL,
  email VARCHAR(45) NOT NULL,
  password_hash VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (email),
  UNIQUE KEY username_UNIQUE (username)
) ;

-- Optional: Add foreign keys (if you want)
-- ALTER TABLE payroll
-- ADD CONSTRAINT fk_payroll_employee
-- FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
-- ON DELETE CASCADE ON UPDATE CASCADE;

-- Commit if using transactional engine
COMMIT;
