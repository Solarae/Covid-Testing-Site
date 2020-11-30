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
            type: Schema.Types.ObjectId, 
            ref: Test
        }],
        default: undefined
      }
})

EmployeeTestSchema.virtual('employeeID').get(() => {return this._id})

module.exports = EmployeeTest = mongoose.model('employeeTest', EmployeeTestSchema)