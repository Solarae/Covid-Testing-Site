const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Test = require('./Test')
const Well = require('./Well')

const PoolSchema = new Schema({
    _id: {
        type: String,
        maxlength: 50,
    },
    testBarcodes: {
        type: [{
            type: String, 
            ref: Test
        }],
        default: []
    },
    well_id: {
        type: String,
        ref: Well,
        default: null
    }, 
})

PoolSchema.virtual('poolBarcode').get(() => {return this._id})

module.exports = Pool = mongoose.model('pool', PoolSchema)