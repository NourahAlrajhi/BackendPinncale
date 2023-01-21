const { Double } = require('mongodb')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const EmployeesSchema = new Schema({
   Employee_Info: [{
        type: JSON,
        required: true,
    }],

}, { timestamps: true },
    { typeKey: '$type' }

)

module.exports = mongoose.model('Employee', EmployeesSchema)