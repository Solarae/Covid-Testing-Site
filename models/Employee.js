const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmployeeSchema = new Schema({
    employeeID: {
        type: String,
        maxlength: 20,
        required: true,
        unique: true
    }, 
    email: {
        type: String,
        maxlength: 50,
        required: true
    }, 
    firstName: {
        type: String,
        maxlength: 50,
        required: true
    }, 
    lastName: { 
        type: String,
        maxlength: 50,
        required: true
    },
    password: {
        type: String,
        maxlength: 50,
        required: true
    }
})

module.exports = Employee = mongoose.model('employee', EmployeeSchema)