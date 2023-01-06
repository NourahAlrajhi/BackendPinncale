var mongoose   = require('mongoose');

const Schema = mongoose.Schema


//collection schema

const CandidateSchema = new Schema({
    Candidate_Info: [{
        type: JSON,
        required: true,
    }],

   /* Candidate_Email: {
        type: String,
        required: true,
    },
    Candidate_Phone_Number: {
        type: String,
        required: true,
    },
    Result: {
        type: String,
        required: true,
    },*/
    resultDetails:[{
        type: JSON,
    }],
    record:[{
        type: JSON,
    }],


}, { timestamps: true }

)
module.exports = mongoose.model('Candidate', CandidateSchema)


