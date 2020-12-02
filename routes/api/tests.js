const express = require('express')
const router = express.Router()

const Test = require('../../models/Test')

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
    const newTest = new Test({
        _id: req.body._id,
        poolBarcode: req.body.poolBarcode,
        employeeID: req.body.employeeID,
        collectionTime: req.body.collectionTime,
        result: req.body.result
    })
    newTest.save().then(test => res.json(test))
        
});

//@route    Delete api/tests/id
//@desc     Delete a test from Test
router.delete('/:id', (req, res) => {
    Test.findById(req.params.id)
        .then(test => test.remove().then(() => res.json({success : true})))
        .catch(error => res.status(404).json({success : false}))
})

router.patch('/', (req, res) => {
    Test.updateMany(
        { _id: { $in: req.body.testBarcodes } },
        { $push: { pools : req.body._id } }
     ).then(() => res.json({success : false}))
})

module.exports = router