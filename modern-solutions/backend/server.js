const express = require('express');
const cors = require('cors'); // ✅ allows your Vue frontend to call this API
require('dotenv').config();  // ✅ loads .env variables like DB creds and PORT

// ✅ modular route files
const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/authRoutes');
const payrollRoutes = require('./routes/payrollRoutes');
const leaveRoutes = require('./routes/leaveRoutes');

const app = express();
app.use(cors());             // ✅ allows cross-origin requests
app.use(express.json());     // ✅ parses incoming JSON bodies

// ✅ mounting routes
app.use('/employees', employeeRoutes);
app.use('/auth', authRoutes);
app.use('/payroll', payrollRoutes);
app.use('/leave', leaveRoutes);

app.get('/', (req, res) => res.send('backserver is running')); // ✅ health check route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    