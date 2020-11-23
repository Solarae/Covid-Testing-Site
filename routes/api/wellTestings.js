const express = require('express')
const router = express.Router()

const WellTesting = require('../../models/Well')

//@route    GET api/wellTestings
//@desc     Get All wellTestings In Well
router.get('/', (req, res) => {
    WellTesting.find()
        .then(wellTestings => res.json(wellTestings) )
})

//@route    POST api/wellTestings
//@desc     Add wellTestings to WellTesting
router.post('/', (req, res) => {
    const newWellTesting = new WellTesting({
        poolBarcode: req.body.poolBarcode,
        wellBarcode: req.body.wellBarcode,
        testingStartingTime: req.body.testingStartingTime,
        result: req.body.result
    })
    newWellTesting.save().then(wellTesting => res.json(wellTesting))
});

//@route    Delete api/wellTestings/id
//@desc     Delete a wellTesting from WellTesting
router.delete('/:id', (req, res) => {
    WellTesting.findById(req.params.id)
        .then(wellTesting => wellTesting.remove().then(() => res.json({success : true})))
        .catch(error => res.status(404).json({success : false}))
})

module.exports = router