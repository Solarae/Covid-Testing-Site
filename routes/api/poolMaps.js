const express = require('express')
const router = express.Router()

const PoolMap = require('../../models/PoolMap')

//@route    GET api/poolMaps
//@desc     Get All poolMaps In PoolMap
router.get('/', (req, res) => {
    PoolMap.find()
        .then(poolMaps => res.json(poolMaps) )
})

//@route    POST api/poolMaps
//@desc     Add poolMap to PoolMaps
router.post('/', (req, res) => {
    const newPoolMap = new PoolMap({
        testBarcode: req.body.testBarcode,
        poolBarcode: req.body.poolBarcode
    })
    newPoolMap.save().then(poolMap => res.json(poolMap))
});

//@route    Delete api/poolMaps/id
//@desc     Delete a poolMap from PoolMap
router.delete('/:id', (req, res) => {
    PoolMap.findById(req.params.id)
        .then(poolMap => poolMap.remove().then(() => res.json({success : true})))
        .catch(error => res.status(404).json({success : false}))
})

module.exports = router