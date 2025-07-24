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
-- user values goes here 


-- Payrolltable
CREATE TABLE payroll (
  payroll_id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT,
  base_salary DECIMAL(10,2),
  deductions DECIMAL(10,2),
  net_pay DECIMAL(10,2),
  FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

ALTER TABLE payroll ADD COLUMN hours_worked INT;
ALTER TABLE payroll ADD COLUMN leave_deductions INT;

INSERT INTO payroll 
  (employee_id, base_salary, deductions, net_pay, hours_worked, leave_deductions) 
VALUES
  (1, 69508.00, 8.00, 69500.00, 160, 8),
  (2, 79010.00, 10.00, 79000.00, 150, 10),
  (3, 54804.00, 4.00, 54800.00, 170, 4),
  (4, 59706.00, 6.00, 59700.00, 165, 6),
  (5, 57855.00, 5.00, 57850.00, 158, 5),
  (6, 64802.00, 2.00, 64800.00, 168, 2),
  (7, 71803.00, 3.00, 71800.00, 175, 3),
  (8, 56000.00, 0.00, 56000.00, 160, 0),
  (9, 61505.00, 5.00, 61500.00, 155, 5),
  (10, 57754.00, 4.00, 57750.00, 162, 4);



-- Leave and attendance
CREATE TABLE attendance (
  attendance_id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT,
  attendance_date DATE,
  status ENUM('Present','Absent'),
  FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);
-- attendance
-- Attendance for Employee 1
INSERT INTO attendance (employee_id, attendance_date, status) VALUES
(1, '2025-07-25', 'Present'),
(1, '2025-07-26', 'Absent'),
(1, '2025-07-27', 'Present'),
(1, '2025-07-28', 'Present'),
(1, '2025-07-29', 'Present');

-- Attendance for Employee 2
INSERT INTO attendance (employee_id, attendance_date, status) VALUES
(2, '2025-07-25', 'Present'),
(2, '2025-07-26', 'Present'),
(2, '2025-07-27', 'Absent'),
(2, '2025-07-28', 'Present'),
(2, '2025-07-29', 'Present');

-- Attendance for Employee 3
INSERT INTO attendance (employee_id, attendance_date, status) VALUES
(3, '2025-07-25', 'Present'),
(3, '2025-07-26', 'Present'),
(3, '2025-07-27', 'Present'),
(3, '2025-07-28', 'Absent'),
(3, '2025-07-29', 'Present');

-- Attendance for Employee 4
INSERT INTO attendance (employee_id, attendance_date, status) VALUES
(4, '2025-07-25', 'Absent'),
(4, '2025-07-26', 'Present'),
(4, '2025-07-27', 'Present'),
(4, '2025-07-28', 'Present'),
(4, '2025-07-29', 'Present');

-- Attendance for Employee 5
INSERT INTO attendance (employee_id, attendance_date, status) VALUES
(5, '2025-07-25', 'Present'),
(5, '2025-07-26', 'Present'),
(5, '2025-07-27', 'Absent'),
(5, '2025-07-28', 'Present'),
(5, '2025-07-29', 'Present');

-- Attendance for Employee 6
INSERT INTO attendance (employee_id, attendance_date, status) VALUES
(6, '2025-07-25', 'Present'),
(6, '2025-07-26', 'Present'),
(6, '2025-07-27', 'Absent'),
(6, '2025-07-28', 'Present'),
(6, '2025-07-29', 'Present');

-- Attendance for Employee 7
INSERT INTO attendance (employee_id, attendance_date, status) VALUES
(7, '2025-07-25', 'Present'),
(7, '2025-07-26', 'Present'),
(7, '2025-07-27', 'Present'),
(7, '2025-07-28', 'Absent'),
(7, '2025-07-29', 'Present');

-- Attendance for Employee 8
INSERT INTO attendance (employee_id, attendance_date, status) VALUES
(8, '2025-07-25', 'Present'),
(8, '2025-07-26', 'Absent'),
(8, '2025-07-27', 'Present'),
(8, '2025-07-28', 'Present'),
(8, '2025-07-29', 'Present');

-- Attendance for Employee 9
INSERT INTO attendance (employee_id, attendance_date, status) VALUES
(9, '2025-07-25', 'Present'),
(9, '2025-07-26', 'Present'),
(9, '2025-07-27', 'Present'),
(9, '2025-07-28', 'Absent'),
(9, '2025-07-29', 'Present');

-- Attendance for Employee 10
INSERT INTO attendance (employee_id, attendance_date, status) VALUES
(10, '2025-07-25', 'Present'),
(10, '2025-07-26', 'Present'),
(10, '2025-07-27', 'Absent'),
(10, '2025-07-28', 'Present'),
(10, '2025-07-29', 'Present');

CREATE TABLE leave_requests (
  leave_id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT,
  leave_date DATE,
  reason VARCHAR(255),
  status ENUM('Approved','Pending','Denied'),
  FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);
-- leave
-- Leave Requests for Employee 1
INSERT INTO leave_requests (employee_id, leave_date, reason, status) VALUES
(1, '2025-07-22', 'Sick Leave', 'Approved'),
(1, '2024-12-01', 'Personal', 'Pending');

-- Leave Requests for Employee 2
INSERT INTO leave_requests (employee_id, leave_date, reason, status) VALUES
(2, '2025-07-15', 'Family Responsibility', 'Denied'),
(2, '2024-12-02', 'Vacation', 'Approved');

-- Leave Requests for Employee 3
INSERT INTO leave_requests (employee_id, leave_date, reason, status) VALUES
(3, '2025-07-10', 'Medical Appointment', 'Approved'),
(3, '2024-12-05', 'Personal', 'Pending');

-- Leave Requests for Employee 4
INSERT INTO leave_requests (employee_id, leave_date, reason, status) VALUES
(4, '2025-07-20', 'Bereavement', 'Approved');

-- Leave Requests for Employee 5
INSERT INTO leave_requests (employee_id, leave_date, reason, status) VALUES
(5, '2024-12-01', 'Childcare', 'Pending');

-- Leave Requests for Employee 6
INSERT INTO leave_requests (employee_id, leave_date, reason, status) VALUES
(6, '2025-07-18', 'Sick Leave', 'Approved');

-- Leave Requests for Employee 7
INSERT INTO leave_requests (employee_id, leave_date, reason, status) VALUES
(7, '2025-07-22', 'Vacation', 'Pending');

-- Leave Requests for Employee 8
INSERT INTO leave_requests (employee_id, leave_date, reason, status) VALUES
(8, '2024-12-02', 'Medical Appointment', 'Approved');

-- Leave Requests for Employee 9
INSERT INTO leave_requests (employee_id, leave_date, reason, status) VALUES
(9, '2025-07-19', 'Childcare', 'Denied');

-- Leave Requests for Employee 10
INSERT INTO leave_requests (employee_id, leave_date, reason, status) VALUES
(10, '2024-12-03', 'Vacation', 'Pending');
