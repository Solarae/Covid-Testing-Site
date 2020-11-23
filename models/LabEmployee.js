const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LabEmployeeSchema = new Schema({
    labID: {
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

module.exports = LabEmployee = mongoose.model('labemployee', LabEmployeeSchema)