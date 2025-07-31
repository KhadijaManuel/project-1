const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Loads environment variables from a .env file

// Modular route files and authentication middleware
const employeeRoutes = require('./routes/employeeRoutes'); // Make sure this path is correct
const authRoutes = require('./routes/authRoutes');
const payrollRoutes = require('./routes/payrollRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const performanceRoutes = require('./routes/performanceRoutes');

const app = express();
app.use(cors());             // Enable CORS for cross-origin requests from your frontend
app.use(express.json());     // Middleware to parse incoming JSON request bodies

// Define API routes. The first argument is the base path.
app.use('/employees', employeeRoutes);
app.use('/reviews', performanceRoutes);
app.use('/auth', authRoutes);
app.use('/payroll', payrollRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/leaves', leaveRoutes); // Mount the leave routes at the /leaves path


// Basic route to check if backend is running
app.get('/', (req, res) => res.send('Backend server is running'));

// Start the server
const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));