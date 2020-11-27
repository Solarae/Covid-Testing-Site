const express = require('express')
const router = express.Router()

const PoolMap = require('../../models/PoolMap')

//@route    GET api/poolMaps
//@desc     Get Pools and their associated test barcodes In PoolMap
router.get('/', (req, res) => {
    PoolMap.find()
        .then(poolMaps => res.json(poolMaps) )
})

//@route    POST api/poolMaps
//@desc     Add poolMap to PoolMaps
router.post('/', (req, res) => {
    const newPoolMap = new PoolMap({
        poolBarcode: req.body.poolBarcode,
        testBarcodes: req.body.testBarcodes,
    })
    newPoolMap.save().then(poolMap => res.json(poolMap))
});

//@route    Delete api/poolMaps/id
//@desc     Delete a poolMap from PoolMap
router.delete('/:id', (req, res) => {
    PoolMap.findByIdAndDelete(req.params.id)
        .then(poolMap => res.json({success : true, poolMap}))
        .catch(error => res.status(404).json({success : false}))
})

router.patch('/:id', (req, res) => {
    PoolMap.updateOne({ _id: req.params.id }, {$set: req.body} )
        .then(poolMap => res.json(poolMap))
})
module.exports = router