const express = require('express')
const router = express.Router()

const Test = require('../../models/Test')
const Employee = require('../../models/Employee')

//@route    GET api/tests
//@desc     Get All Tests In Test
router.get('/', (req, res) => {
    Test.find()
        .then(tests => res.json(tests) )
})

//@route    GET api/tests/id
//@desc     Get the test with given id
router.get('/:id', (req, res) => {
    Test.findById(req.params.id)
        .then(test => res.json(test) )
        .catch(error => res.status(404).json({success : false}))
})

//@route    POST api/tests
//@desc     Add test to Test
router.post('/', (req, res) => {
    Test.findById(req.body._id)
        .then((test) => {
            if (test != null) throw new Error(`Test with the id ${req.body._id} already exists`)
            
        })
        .then(() => {
            return Employee.findById(req.body.employeeID)
        })
        .then((employee) => {
            if (employee === null) throw new Error(`Employee with the id ${req.body.employeeID} doesn't exist`)  
        })
        .then(() => {
            const newTest = new Test({
                _id: req.body._id,
                employeeID: req.body.employeeID,
                collectionTime: req.body.collectionTime,
            })
            return newTest.save()
        })
        .then(test => res.json(test))
        .catch(error => res.status(404).json({success : false}))
    })

//@route    Delete api/tests/id
//@desc     Delete a test from Test
router.delete('/:id', (req, res) => {
    Test.findById(req.params.id)
        .then(test => test.remove().then(() => res.json({success : true})))
        .catch(error => res.status(404).json({success : false}))
})

//@route    GET api/tests/:employeeID
//@desc     Get All Tests from some employee
router.get('/:employeeID', async (req, res) => {
    let result = await Test.find({employeeID:req.params.employeeID});

    console.log(result);


    res.send(result);
        
})




router.patch('/', (req, res) => {
    Test.updateMany(
        { _id: { $in: req.body.testBarcodes } },
        { $push: { pools : req.body._id } }
     ).then(() => res.json({success : false}))
})

module.exports = router