const express = require('express');
const cors = require('cors');// its for security form what
require('dotenv').config();

//just the routes 
const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/authRoutes');
const payrollRoutes = require('./routes/payrollRoutes');
const leaveRoutes = require('./routes/leaveRoutes');

const app = express();
app.use(cors());
app.use(express.json());

//using the routes for the app 
app.use('/api/employees', employeeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/leave', leaveRoutes);

app.get('/', (req, res) => res.send('backserver is running'));// will display the code in the terminal if there is no errors 

const PORT = process.env.PORT || 5000;// running the project on port 5000 since its used for local dev mostly 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));//here is the port logic 
