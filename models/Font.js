const mongoose = require('mongoose');
const Schema = mongoose.Schema

const fontSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
})

module.exports = mongoose.mode('Font', fontSchema)