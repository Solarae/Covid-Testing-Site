const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WellSchema = new Schema({
    wellBarcode: {
        type: String,
        maxlength: 50,
        required: true,
        unique: true
    }
})

module.exports = Well = mongoose.model('well', WellSchema)