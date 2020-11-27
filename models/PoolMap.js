const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PoolMapSchema = new Schema({
    poolBarcode: {
        type: String,
        maxlength: 50,
        required: true
    },
    testBarcodes: {
        type: Array,
        required: true
    }, 
    
})

module.exports = PoolMap = mongoose.model('poolmap', PoolMapSchema)