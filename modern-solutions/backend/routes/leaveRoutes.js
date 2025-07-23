// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('leavelist'));

// router.get('/', (req, res) => {
//     const leavelist = [
//         {}
//     ]
// }


module.exports = router;
