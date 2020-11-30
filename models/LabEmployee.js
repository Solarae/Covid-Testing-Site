const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LabEmployeeSchema = new Schema({
    _id: {
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

LabEmployeeSchema.virtual('labID').get(() => {return this._id})

module.exports = LabEmployee = mongoose.model('labEmployee', LabEmployeeSchema)