const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PoolSchema = new Schema({
    poolBarcode: {
        type: String,
        maxlength: 50,
        required: true
    }
})

module.exports = Pool = mongoose.model('pool', PoolSchema)