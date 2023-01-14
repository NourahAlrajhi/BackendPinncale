const mongoose = require('mongoose')

const Schema = mongoose.Schema

const VacancySchema = new Schema({

   
        Position: [{
            _id: {
                type: String,
                required: true
            },
            arr: [{
                type: JSON,
                required: true
            }],
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
            ExpectedSalary: {
                type: Number,
                required: true
            },
            user_id: {
                type: String,
                required: true
            }
        }],
        title: {
            type: String,
           
        },
        Esubject: {
            type: String,
           
        },
        Ebody: {
            type: String,
            
        },
        linkExpDate: {
            type: String,
            
        },
        linkExpTime: {
            type: Date,
          
        },
        Candidate: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Candidate'

        }],
        Pass: [{
            type: JSON,
        }],
        fail: [{
            type: JSON,
        }],
        notAttended: [{
            type: JSON,
        }],
        CandidateList: {
            type: String,
        },
        InterviewedCandidates: {
            type: Number,
            required: true
        },
        user_id: {
            type: String,
            required: true
           // required: true
        },
        status:{
            type: String,
            required: true 
        }
    }, { timestamps: true }





)


module.exports = mongoose.model('Vacancy', VacancySchema)