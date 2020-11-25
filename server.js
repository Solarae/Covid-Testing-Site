const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const employees = require('./routes/api/employees')
const employeeTests = require('./routes/api/employeeTests')
const labEmployees = require('./routes/api/labEmployees')
const poolMaps = require('./routes/api/poolMaps')
const pools = require('./routes/api/pools')
const wells = require('./routes/api/wells')
const wellTestings = require('./routes/api/wellTestings')

dotenv.config({path: './config/config.env'})

connectDB()

const app = express()

app.use(express.json())
app.use('/api/employees', employees)
app.use('/api/employeeTests', employeeTests)
app.use('/api/labEmployees', labEmployees)
app.use('/api/poolMaps', poolMaps)
app.use('/api/pools', pools)
app.use('/api/wells', wells)
app.use('/api/wellTestings', wellTestings)
const PORT =  process.env.PORT || 5000

app.listen(
    PORT,
    console.log(`Server running on port ${PORT}`)
)

