const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmployeeTestSchema = new Schema({
    testBarcode: {
        type: String,
        maxlength: 50,
        required: true,
        unique: true
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
    collectedBy: { 
        type: String,
        maxlength: 20,
        required: true
    }
})

module.exports = EmployeeTest = mongoose.model('employeeTest', EmployeeTestSchema)