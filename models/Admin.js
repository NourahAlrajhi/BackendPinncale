const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const { Timestamp } = require('mongodb')

const Schema = mongoose.Schema

const AdminSchema = new Schema({
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
}, { timestamps: true }

)
// static signup method
AdminSchema.statics.signup = async function (logName, password, name) {

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

    const Admin = await this.create({ logName, password: hash, name })

    return Admin
}

// static login method
AdminSchema.statics.login = async function (logName, password, name) {

    if (!logName || !password) {
        throw Error('All fields must be filled')
    }

    const Admin = await this.findOne({ logName })
    if (!Admin) {
        throw Error('Admin is not authorized')
    }

    const match = await bcrypt.compare(password, Admin.password)
    if (!match) {
        throw Error('Incorrect password/UserName')
    }

    return Admin
}


module.exports = mongoose.model('Admin', AdminSchema)