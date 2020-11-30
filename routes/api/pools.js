const express = require('express')
const router = express.Router()

const Pool = require('../../models/Pool')

//@route    GET api/pools
//@desc     Get All pools In Pool
router.get('/', (req, res) => {
    Pool.find()
        .then(pools => res.json(pools) )
})

//@route    POST api/tests
//@desc     Add test to Test
router.post('/', (req, res) => {
    const newPool = new Pool({
        _id: req.body.poolBarcode,
        testBarcodes: req.body.testBarcodes
    })
    newPool.save().then(pool => res.json(pool))
        .catch(error => res.status(404).json(newPool))
});

//@route    Delete api/tests/id
//@desc     Delete a test from Test
router.delete('/:id', (req, res) => {
    Pool.findById(req.params.id)
        .then(pool => pool.remove().then(() => res.json({success : true})))
        .catch(error => res.status(404).json({success : false}))
})

module.exports = router