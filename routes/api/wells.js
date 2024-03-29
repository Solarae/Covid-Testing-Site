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
        _id: req.body._id,
        pool_id: req.body.pool_id,
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


//@route    GET api/wells/:id
//@desc     Get wells based on ID
router.get('/:id', (req, res) => {
    Well.findById(req.params.id)
        .then(wells => res.json(wells) )
})


//@route    PUT api/wells/:id
//@desc     Update wells based on ID
router.put('/edit/:id', (req, res) => {

    Well.updateOne({_id:req.params.id} , {$set:{result:req.body.result}})
        .then(wells => res.json(wells))
})
module.exports = router