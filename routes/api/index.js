const express = require("express");
const router = express.Router();

const employeesRoutes = require('./employees');
const labEmployeeRoutes = require('./labEmployees');
const employeeTestRoutes = require('./employeeTests')












router.use("/employees", employeesRoutes);
router.use('/labemployees', labEmployeeRoutes);
router.use("/employeeTests",employeeTestRoutes);

module.exports = router;