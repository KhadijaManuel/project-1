-- Create database
CREATE DATABASE moderntech_tech_solutions;

USE moderntech_tech_solutions;

-- employeestable
CREATE TABLE employees (
  employee_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  role VARCHAR(50),
  salary DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO employees (first_name, last_name, email, role, salary)
VALUES
('Sibongile', 'Nkosi', 'sibongile.nkosi@moderntech.com', 'Software Engineer', 70000.00),
('Lungile', 'Moyo', 'lungile.moyo@moderntech.com', 'HR Manager', 80000.00),
('Thabo', 'Molefe', 'thabo.molefe@moderntech.com', 'Quality Analyst', 55000.00),
('Keshav', 'Naidoo', 'keshav.naidoo@moderntech.com', 'Sales Representative', 60000.00),
('Zanele', 'Khumalo', 'zanele.khumalo@moderntech.com', 'Marketing Specialist', 58000.00),
('Sipho', 'Zulu', 'sipho.zulu@moderntech.com', 'UI/UX Designer', 65000.00),
('Naledi', 'Moeketsi', 'naledi.moeketsi@moderntech.com', 'DevOps Engineer', 72000.00),
('Farai', 'Gumbo', 'farai.gumbo@moderntech.com', 'Content Strategist', 56000.00),
('Karabo', 'Dlamini', 'karabo.dlamini@moderntech.com', 'Accountant', 62000.00),
('Fatima', 'Patel', 'fatima.patel@moderntech.com', 'Customer Support Lead', 58000.00);

-- Users table (for login/auth)
CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE,
  password_hash VARCHAR(255),
  employee_id INT,
  FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

-- Payrolltable
CREATE TABLE payroll (
  employee_id INT,
  base_salary DECIMAL(10,2),
  deductions DECIMAL(10,2),
  net_pay DECIMAL(10,2),
  FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

INSERT INTO payroll (employee_id, base_salary, deductions, net_pay) VALUES
(1, 69508.00, 8.00, 69500.00),
(2, 79010.00, 10.00, 79000.00),
(3, 54804.00, 4.00, 54800.00),
(4, 59706.00, 6.00, 59700.00),
(5, 57855.00, 5.00, 57850.00),
(6, 64802.00, 2.00, 64800.00),
(7, 71803.00, 3.00, 71800.00),
(8, 56000.00, 0.00, 56000.00),
(9, 61505.00, 5.00, 61500.00),
(10, 57754.00, 4.00, 57750.00);


-- Leavetable
CREATE TABLE leave_requests (
  leave_id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT,
  start_date DATE,
  end_date DATE,
  status ENUM('Pending','Approved','Rejected'),
  FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);
