const express = require('express')
const router = express.Router()
const Employee = require('../../models/Employee')
const passport = require('passport')


//@route    GET api/employees
//@desc     Get All Employees In Employee
router.get('/', (req, res) => {
    Employee.find()
        .then(employees => res.json(employees) )
})

//@route    POST api/employees
//@desc     Add an employee to Employee
router.post('/', (req, res) => {
    console.log(req.body._id);

    const newEmployee = new Employee({
        _id: req.body._id,
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


//@route    POST api/employees/login
//@desc     Logs in a user
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send(null);
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
         // console.log("req.user is "+req.user)
          res.send(user);
        });
      }
    })(req, res, next);
});

router.get("/getInfo" ,(req,res) =>{
    res.send(req.user);
})

router.get("/logout",(req,res)=>{
  req.logOut();
  res.send("Success Logout")
})


module.exports = router