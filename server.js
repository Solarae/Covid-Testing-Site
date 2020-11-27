const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const cors = require('cors')
const employees = require('./routes/api/employees')
const employeeTests = require('./routes/api/employeeTests')
const labEmployees = require('./routes/api/labEmployees')
const poolMaps = require('./routes/api/poolMaps')
const pools = require('./routes/api/pools')
const wells = require('./routes/api/wells')
const wellTestings = require('./routes/api/wellTestings')

dotenv.config({path: './config/config.env'})
const bodyParser = require('body-parser')
const passport = require('./config/passport')


connectDB()

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


// app.use(express.static('public'));
// app.use(express.cookieParser());
// app.use(express.bodyParser());
// app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
// app.use(app.router);



app.use(cors())
const router=require('./routes/api')
app.use('/api',router);




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

