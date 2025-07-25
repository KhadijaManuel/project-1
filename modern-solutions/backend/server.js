const express = require('express');
const cors = require('cors'); // allows our Vue frontend to use and call this API
require('dotenv').config();  // uses the dotenv for db details and the port 


//modular route files and auth for protection onn the routes
const authMiddleware = require('./middleware/authMiddleware');
const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/authRoutes');
const payrollRoutes = require('./routes/payrollRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const performanceRoutes = require('./routes/performanceRoutes');


const app = express();
app.use(cors());             // browser blocking or something like that 
app.use(express.json());     // parses incoming JSON bodies for the thunder client 


//routes
app.use('/employees', employeeRoutes);
app.use('/reviews', performanceRoutes);
app.use('/auth', authRoutes);
app.use('/payroll', payrollRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/leaves', leaveRoutes);

app.get('/', (req, res) => res.send('backserver is running')); // checking if backend is running 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));// running the backend on port 5000
    