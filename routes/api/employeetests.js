const express = require('express')
const router = express.Router()

const EmployeeTest = require('../../models/EmployeeTest')

//@route    GET api/employeetests
//@desc     Get All EmployeeTests In EmployeeTest
router.get('/', (req, res) => {
    EmployeeTest.find()
        .then(employeetests => res.json(employeetests) )
})

//@route    POST api/employeetests
//@desc     Add an employeetest to EmployeeTest
router.post('/', (req, res) => {
    const newEmployeeTest = new EmployeeTest({
        testBarcode: req.body.testBarcode,
        employeeID: req.body.employeeID,
        collectionTime: req.body.collectionTime,
        collectionBy: req.body.collectionBy
    })
    newEmployeeTest.save().then(employeetest => res.json(employeetest))
});

//@route    Delete api/employeetests/id
//@desc     Delete an employeetest from EmployeeTest
router.delete('/:id', (req, res) => {
    EmployeeTest.findById(req.params.id)
        .then(employeetest => employeetest.remove().then(() => res.json({success : true})))
        .catch(error => res.status(404).json({success : false}))
})

module.exports = router