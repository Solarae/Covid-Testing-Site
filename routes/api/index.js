const express = require("express");
const router = express.Router();

const employeesRoutes = require('./employees');
const labEmployeeRoutes = require('./labEmployees');












router.use("/employees", employeesRoutes);
router.use('/labemployees', labEmployeeRoutes);

module.exports = router;