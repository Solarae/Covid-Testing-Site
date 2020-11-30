const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TestSchema = new Schema({
    _id: {
        type: String,
        maxlength: 50,
    },
    poolBarcode: {
        type: String,
        maxlength: 50,
        required: true
    },
    employeeID: {
        type: String,
        maxlength: 50,
        required: true
    },
    collectionTime: {
        type: Date,
        required: true
    },
    result: {
        type: String, 
        enum: ['inprogress', 'negative', 'positive']
    }
})

PoolSchema.virtual('testBarcode').get(() => {return this._id})

module.exports = Test = mongoose.model('test', TestSchema)