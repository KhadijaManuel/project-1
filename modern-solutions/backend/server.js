// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/authRoutes');
const payrollRoutes = require('./routes/payrollRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const performanceRoutes = require('./routes/performanceRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Prefix with /api
app.use('/employees', employeeRoutes);
app.use('/reviews', performanceRoutes);
app.use('/auth', authRoutes);
app.use('/payroll', payrollRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/leaves', leaveRoutes);

// Health check
app.get('/', (req, res) => res.send('Backend server is running'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
