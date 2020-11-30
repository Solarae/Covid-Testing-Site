const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const cors = require('cors')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const employees = require('./routes/api/employees')
const employeeTests = require('./routes/api/employeeTests')
const labEmployees = require('./routes/api/labEmployees')
const wells = require('./routes/api/wells')


dotenv.config({path: './config/config.env'})
const bodyParser = require('body-parser')
const passport = require('passport')


connectDB()

const app = express()


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


//set up sessions/cookies
app.use(session({ cookie: { maxAge: 600000 }, 
  secret: 'secretcode',
  resave: false, 
  saveUninitialized: false})
);
app.use(cookieParser("secretcode"));


//set up passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport.js')(passport)     



//set up cors
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);




const router=require('./routes/api')
app.use('/api',router);




app.use(express.json())
app.use('/api/employees', employees)
app.use('/api/employeeTests', employeeTests)
app.use('/api/labEmployees', labEmployees)
app.use('/api/wells', wells)
const PORT =  process.env.PORT || 5000

app.listen(
    PORT,
    console.log(`Server running on port ${PORT}`)
)
