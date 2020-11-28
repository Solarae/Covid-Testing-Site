const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmployeeTestSchema = new Schema({
    testBarcodes: {
        type: Array
        // REF
    },
    employeeID: {
        type: String,
        maxlength: 20,
        required: true
    }, 
    collectionTime: {
        type: Date,
        required: true
    },
    result: {
        type: String, 
        enum: ['inprogress', 'negative', 'positive']
    }
})

module.exports = EmployeeTest = mongoose.model('employeeTest', EmployeeTestSchema)