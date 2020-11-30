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
        testBarcode: req.body.testBarcode,
        employeeID: req.body.employeeID,
        collectionTime: req.body.collectionTime,
        collectedBy: req.body.collectedBy
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



//@route    Get api/employeeTests/:employeeID
//@desc     Get all testBarcodes from an employee

router.get('/getTestBarcodes/:employeeID',async (req,res) => {
    console.log("ID      "+req.params.employeeID);
    let result = await EmployeeTest.findOne({employeeID:req.params.employeeID});

    let testBarcodes = result.testBarcodes;

    console.log(testBarcodes);    

    res.send(testBarcodes);


})


module.exports = router