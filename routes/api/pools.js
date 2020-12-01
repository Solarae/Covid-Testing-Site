const express = require('express')
const router = express.Router()

const Pool = require('../../models/Pool')
const Test = require('../../models/Test')

//@route    GET api/pools
//@desc     Get All pools In Pool
router.get('/', (req, res) => {
    Pool.find()
        .then(pools => res.json(pools) )
})

//@route    POST api/pools
//@desc     Add pool to Pool
router.post('/', (req, res) => {
    const newPool = new Pool({
        _id: req.body._id,
        testBarcodes: req.body.testBarcodes,
        well_id: req.body.well_id
    })
    newPool.save().then(() => {
        Test.updateMany(
            { _id: { $in: req.body.testBarcodes } },
            { $push: { pools : req.body._id } },
         )
    }).then((pool) => res.json(pool))
});

//@route    Delete api/pools/id
//@desc     Delete a pool from Pool
router.delete('/:id', (req, res) => {
    Pool.findById(req.params.id)
        .then(pool => pool.remove().then(() => res.json({success : true})))
        .catch(error => res.status(404).json({success : false}))
})

//@route    Patch api/pools/id
//@desc     Patch a pool from Pool
router.patch('/:id', (req, res) => {
    Pool.findById(req.body._id)
        .then(pool => {
            if (pool !== null && res.params.id !== req.body._id) {
                res.status(404).json({success : false})
            } else {
                if (req.params.id !== req.body._id) {
                        res.remove()
                            .then(() => {
                                const newPool = new Pool({
                                    _id: req.body._id,
                                    testBarcodes: req.body.testBarcodes,
                                    well_id: req.body.well_id
                                })
                                newPool.save()
                                    .then(() => {
                                        Test.updateMany(
                                            { _id: { $in: req.body.addedTests } },
                                            { $push: { pools : req.body._id } },
                                         ).then(() => {
                                            Test.updateMany(
                                                { _id: { $in: req.body.deletedTests } },
                                                { $pull: { pools : req.body._id } },
                                             ).then((res) => res.json(res))
                                            })
                                        })
                                    })
                                } else {
                                    Pool.updateById(req.params.id, {$set: req.body.testBarcodes} )
                                        .then(() => {
                                            Test.updateMany(
                                                { _id: { $in: req.body.addedTests } },
                                                { $push: { pools : req.body._id } },
                                                ).then(() => {
                                                    Test.updateMany(
                                                        { _id: { $in: req.body.deletedTests } },
                                                        { $pull: { pools : req.body._id } },
                                                        ).then((res) => res.json(res))
                                                    })
                                                })
                                            }
                                        }
                                    })
                                })

module.exports = router