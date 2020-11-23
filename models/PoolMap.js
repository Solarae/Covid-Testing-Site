const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PoolMapSchema = new Schema({
    testBarcode: {
        type: String,
        maxlength: 50,
        required: true
    }, 
    poolBarcode: {
        type: String,
        maxlength: 50,
        required: true
    }
})

module.exports = PoolMap = mongoose.model('poolmap', PoolMapSchema)