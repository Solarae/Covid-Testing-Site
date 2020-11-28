const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
        testBarcodes: {
            type: Array,
            // REF OBJECT ID
        }
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