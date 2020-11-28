const express = require('express')
const router = express.Router()

const EmployeeTest = require('../../models/EmployeeTest')

//@route    GET api/employeeTests
//@desc     Get All employeeTests In EmployeeTest
router.get('/', (req, res) => {
    EmployeeTest.find()
        .then(employeeTests => res.json(employeeTests) )
})

//@route    POST api/employeeTests
//@desc     Add an employeetest to EmployeeTest
router.post('/', (req, res) => {
    const newEmployeeTest = new EmployeeTest({
        testBarcodes: req.body.testBarcodes,
        employeeID: req.body.employeeID,
        collectionTime: req.body.collectionTime,
        result: req.body.result
    })
    newEmployeeTest.save().then(employeeTest => res.json(employeeTest))
    .catch(error => res.status(404).json({success : false}))
});

//@route    Delete api/employeeTests/id
//@desc     Delete an employeeTest from EmployeeTest
router.delete('/:id', (req, res) => {
    EmployeeTest.findById(req.params.id)
        .then(employeeTest => employeeTest.remove().then(() => res.json({success : true})))
        .catch(error => res.status(404).json({success : false}))
})

module.exports = router