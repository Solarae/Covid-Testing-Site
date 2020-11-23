const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PoolMapSchema = new Schema({
    testBarCode: {
        type: String,
        maxlength: 50,
        required: true
    }, 
    poolBarCode: {
        type: String,
        maxlength: 50,
        required: true
    }
})

module.exports = PoolMap = mongoose.model('poolmap', PoolMapSchema)