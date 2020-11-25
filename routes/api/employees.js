const express = require('express')
const router = express.Router()
const passport=require('../../config/passport.js')
const Employee = require('../../models/Employee')



//@route    GET api/employees
//@desc     Get All Employees In Employee
router.get('/', (req, res) => {
    Employee.find()
        .then(employees => res.json(employees) )
})

//@route    POST api/employees
//@desc     Add an employee to Employee
router.post('/', (req, res) => {
    console.log(req.body);

    const newEmployee = new Employee({
        employeeID: req.body.employeeID,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    })
    newEmployee.save().then(employee => res.json(employee))
});

//@route    Delete api/employees/id
//@desc     Delete an employee from Employee
router.delete('/:id', (req, res) => {
    Employee.findById(req.params.id)
        .then(employee => employee.remove().then(() => res.json({success : true})))
        .catch(error => res.status(404).json({success : false}))
})

router.post('/login',
passport.authenticate('local',{ successRedirect: '/',
    failureRedirect: '/login' })
    ,(req,res) =>{
        console.log("body:"+ JSON.stringify(req.body));

})


module.exports = router