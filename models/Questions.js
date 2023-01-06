const mongoose = require('mongoose')


const Schema = mongoose.Schema

const QuestionSchema = new Schema({
    Question: {
        type: String,
        required: true,
        unique: true
    },


}, { timestamps: true }

)
module.exports = mongoose.model('Question', QuestionSchema)