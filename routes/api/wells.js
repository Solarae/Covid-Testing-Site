const express = require('express')
const router = express.Router()

const Well = require('../../models/Well')

//@route    GET api/wells
//@desc     Get All wells In Well
router.get('/', (req, res) => {
    Well.find()
        .then(wells => res.json(wells) )
})

//@route    POST api/wells
//@desc     Add well to Well
router.post('/', (req, res) => {
    const newWell = new Well({
        wellBarcode: req.body.wellBarcode,
        pool: req.body.pool,
        testingStartTime: req.body.testingStartTime,
        result: req.body.result
    })
    newWell.save().then(well => res.json(well))
});

//@route    Delete api/wells/id
//@desc     Delete a well from Well
router.delete('/:id', (req, res) => {
    Well.findById(req.params.id)
        .then(well => well.remove().then(() => res.json({success : true})))
        .catch(error => res.status(404).json({success : false}))
})

module.exports = router