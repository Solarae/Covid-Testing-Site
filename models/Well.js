const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WellSchema = new Schema({
    _id: {
        type: String,
        maxlength: 50,
    },
    pool_id: {
        type: String
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

WellSchema.virtual('wellBarcode').get(() => {return this._id})

module.exports = Well = mongoose.model('well', WellSchema)