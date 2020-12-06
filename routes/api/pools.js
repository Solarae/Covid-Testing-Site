const express = require('express')
const router = express.Router()

const Pool = require('../../models/Pool')
const Test = require('../../models/Test')

const { InvalidPoolBarcodeError } = require('../../errors')

//@route    GET api/pools
//@desc     Get All pools In Pool
router.get('/', (req, res) => {
    Pool.find()
        .then(pools => res.json(pools) )
})

//@route    POST api/pools
//@desc     Add pool to Pool
router.post('/', (req, res, next) => {
    Pool.findById(req.body._id)
        .then(pool => { if (pool != null) throw new InvalidPoolBarcodeError(`A pool with the entered barcode already exists`, 404)})
        .then(() => {
            const newPool = new Pool({
                _id: req.body._id,
                testBarcodes: req.body.testBarcodes,
                well_id: req.body.well_id
            })
            return newPool.save()
        })
        .then((pool) => res.json(pool))
        .then(() => {
            return Test.updateMany(
                { _id: { $in: req.body.testBarcodes } },
                { $push: { pools : req.body._id } }
             )
        })  
        .catch(next)
});

//@route    Delete api/pools/id
//@desc     Delete a pool from Pool
router.delete('/:id', (req, res) => {
    Pool.findById(req.params.id)
        .then(pool =>  pool.remove() )
        .then((deletedPool) => {
            return Test.updateMany(
                { _id: { $in: deletedPool.testBarcodes } },
                { $pull: { pools : deletedPool._id } }
             )
        })
        .then(() => res.json({success: true})) 
        .catch(error => res.status(404).json({success : false}))
})

//@route    Patch api/pools/id
//@desc     Patch a pool from Pool
router.patch('/:id', (req, res, next) => {
    Pool.findById(req.body._id)
        .then(pool => {
            if (pool !== null && req.params.id !== req.body._id) {
                throw new InvalidPoolBarcodeError('A pool with the entered barcode already exists', 404)
            } else {
                if (req.params.id !== req.body._id) {
                    Pool.findById(req.params.id)
                        .then(pool => pool.remove())
                        .then(() => {
                                const newPool = new Pool({
                                    _id: req.body._id,
                                    testBarcodes: req.body.testBarcodes,
                                    well_id: req.body.well_id
                                })

                                return newPool.save()
                            })
                        .then((pool) => res.json(pool))
                        .then(() => {
                                return Test.updateMany(
                                    { _id: { $in: req.body.testBarcodes } },
                                    {  $push: { pools : req.body._id } }
                                         )})
                        .then(() => {
                                return Test.updateMany(
                                    { _id: { $in: req.body.testBarcodes } },
                                    { $pull: { pools : req.params.id } }
                                        )})
                        .then(() => {
                                return Test.updateMany(
                                    { _id: { $in: req.body.deletedTests } },
                                    { $pull: { pools : req.body._id } }
                                                )})
                } else {
                    Pool.findByIdAndUpdate(req.params.id, {$set: {testBarcodes: req.body.testBarcodes}} )
                        .then((pool) => res.json(pool))
                        .then(() => {
                                return Test.updateMany(
                                    { _id: { $in: req.body.addedTests } },
                                    { $push: { pools : req.body._id } }
                                        )})
                        .then(() => {
                                return Test.updateMany(
                                    { _id: { $in: req.body.deletedTests } },
                                    { $pull: { pools : req.body._id } }
                                        )})
                    }
                }
            })
            .catch(next)
        })
                                

//@route    GET api/pools/:id
//@desc     Get pool based on ID
router.get('/:id', (req, res) => {
    Pool.findById(req.params.id)
        .then(pools => res.json(pools) )
})


module.exports = router