const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Test = require('./Test')

const EmployeeTestSchema = new Schema({
    _id: {
        type: String,
        maxlength: 20,
    },
    testBarcodes: {
        type: [{
            type: String, 
            ref: Test
        }],
        default: []
      }
})

EmployeeTestSchema.virtual('employeeID').get(() => {return this._id})

module.exports = EmployeeTest = mongoose.model('employeeTest', EmployeeTestSchema)