const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Test = require('./Test')

const EmployeeTestSchema = new Schema({
    testBarcodes: [{
        type: Schema.Types.ObjectId, 
        ref: Test
    }],
    employeeID: {
        type: String,
        maxlength: 20,
        required: true
    }
})

module.exports = EmployeeTest = mongoose.model('employeeTest', EmployeeTestSchema)