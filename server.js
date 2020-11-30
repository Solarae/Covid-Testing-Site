const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const employees = require('./routes/api/employees')
const employeeTests = require('./routes/api/employeeTests')
const labEmployees = require('./routes/api/labEmployees')
const pools = require('./routes/api/pools')
const tests = require('./routes/api/tests')
const wells = require('./routes/api/wells')


dotenv.config({path: './config/config.env'})

connectDB()

const app = express()

app.use(express.json())
app.use('/api/employees', employees)
app.use('/api/employeeTests', employeeTests)
app.use('/api/labEmployees', labEmployees)
app.use('/api/tests', pools)
app.use('/api/tests', tests)
app.use('/api/wells', wells)
const PORT =  process.env.PORT || 5000

app.listen(
    PORT,
    console.log(`Server running on port ${PORT}`)
)

