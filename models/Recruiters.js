const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const { Timestamp } = require('mongodb')

const Schema = mongoose.Schema

const RecruiterSchema = new Schema({
    logName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    Vacancies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vacancy'

    }],
    Employee_ID: {
        type: String,
        required: true
    },

}, { timestamps: true }

)
// static signup method
RecruiterSchema.statics.signup = async function (logName, password, name, Employee_ID) {

    // validation
    if (!logName || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }
    const exists = await this.findOne({ logName })

    if (exists) {
        throw Error('Username already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    //const STRINGNAME = RecruiterCompanyId + ''
    const Recruiter = await this.create({ logName, password: hash, name, Employee_ID })

    return Recruiter
}

// static login method
RecruiterSchema.statics.login = async function (logName, password, name) {

    if (!logName || !password) {
        throw Error('All fields must be filled')
    }

    const Recruiter = await this.findOne({ logName })
    if (!Recruiter) {
        throw Error('Recruiter is not authorized')
    }

    const match = await bcrypt.compare(password, Recruiter.password)
    if (!match) {
        throw Error('Incorrect password')
    }

    return Recruiter
}




// update a Recruiter doc
RecruiterSchema.statics.updateRecruiter = async function (Vacancies, id) {
    //const { id } = req.params

    /* if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(404).json({ error: 'No such Recruiter' })
     }*/

    //const { Vacancies } = req.body

    var index;
    for (index = 0; index < Vacancies.length; ++index) {
        if (!Vacancies[index].Position) {
            throw Error('All fields must be filled')
        }
        if (!Vacancies[index].title) {
            throw Error('All fields must be filled')
        }
        if (!Vacancies[index].Ebody) {
            throw Error('All fields must be filled')
        }
        if (!Vacancies[index].Esubject) {
            throw Error('All fields must be filled')
        }
        if (!Vacancies[index].linkExpDate) {
            throw Error('All fields must be filled')
        }
        if (!Vacancies[index].linkExpTime) {
            throw Error('All fields must be filled')
        } if (!Vacancies[index].Candidate) {
            throw Error('All fields must be filled')
        }

    }



    /*   if (emptyFields.length > 0) {
           return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
       }*/


    const RecruiterJobVacancy = await this.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!RecruiterJobVacancy) {
        throw Error('Recruiter is not found so he/she is not authorized')
    }

    return RecruiterJobVacancy
}




module.exports = mongoose.model('Recruiters', RecruiterSchema)