const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WellTestingSchema = new Schema({
    poolBarcode: {
        type: String,
        maxlength: 50,
        required: true
    }, 
    wellBarcode: {
        type: String,
        maxlength: 50,
        required: true
    }, 
    testingStartTime: {
        type: Date,
        required: true
    },
    result: {
        type: String, enum: ['admin', 'guest'] }
    }
})

module.exports = WellTesting = mongoose.model('welltesting', WellTestingSchema)