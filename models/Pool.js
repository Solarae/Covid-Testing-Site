const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Test = require('./Test')

const PoolSchema = new Schema({
    _id: {
        type: String,
        maxlength: 50,
    },
    testBarcodes: {
        type: [{
            type: Schema.Types.ObjectId, 
            ref: Test
        }],
        default: undefined
      }
})

PoolSchema.virtual('poolBarcode').get(() => {return this._id})

module.exports = Pool = mongoose.model('pool', PoolSchema)