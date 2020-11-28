const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Test = require('./Test')

const WellSchema = new Schema({
    wellBarcode: {
        type: String,
        maxlength: 50,
        required: true
    },
    pool: {
        poolBarcode: {
            type: String,
            maxlength: 50,
            required: true
        },
        testBarcodes: [{
            type: Schema.Types.ObjectId, 
            ref: 'Test'
          }]
    }, 
    testingStartTime: {
        type: Date,
        required: true
    },
    result: {
        type: String, 
        enum: ['inprogress', 'negative', 'positive']
    }
})

module.exports = Well = mongoose.model('well', WellSchema)