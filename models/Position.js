const { Double } = require('mongodb')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PositionSchema = new Schema({
    arr: [{
        type: JSON,
        required: true

    }],
    /*expectedAnswers: [{
        type: String,
        required: true

    }],*/
    description: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    noticePeriod: {
        type: String,
        required: true
    },
    /* imprtanceOfQ: [{
         type: String,
         required: true
 
     }],*/
    ExpectedSalary: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true },
    { typeKey: '$type' }

)

module.exports = mongoose.model('Position', PositionSchema)