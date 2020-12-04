const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TestSchema = new Schema({
    _id: {
        type: String,
        maxlength: 50,
    },
    pools: {
        type: [String],
        default: []
    },
    employeeID: {
        type: String,
        maxlength: 50,
        required: true
    },
    collectionTime: {
        type: Date,
        required: true
    }
})

TestSchema.virtual('testBarcode').get(() => {return this._id})

module.exports = Test = mongoose.model('test', TestSchema)