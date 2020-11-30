const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmployeeSchema = new Schema({
    _id: {
        type: String,
        maxlength: 20,
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

EmployeeSchema.virtual('employeeID').get(() => {return this._id})

module.exports = Employee = mongoose.model('employee', EmployeeSchema)