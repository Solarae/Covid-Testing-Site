const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TestSchema = new Schema({
    testBarcode: {
        type: String,
        required: true
    },
    poolBarcode: {
        type: String,
        maxlength: 50,
        required: true
    },
    employeeID: {
        type: String,
        maxlength: 50,
        required: true
    }
})

module.exports = Test = mongoose.model('test', PoolMapSchema)