const Recruiter = require('../models/Recruiters')
const Admin = require('../models/Admin')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })//three day then user will be loged out
}
// login a Recruiter
const loginRecruiter = async (req, res) => {
    const { logName, password } = req.body
    try {
        const Recruiters = await Recruiter.login(logName, password)

        // create a token
        const token = createToken(Recruiters._id)
        console.log(token)
        const RecName = Recruiters.name
        const Vavancy = Recruiters.Vacancies
        console.log(RecName)
        // process.env.RecruiterID=Recruiters._id
        // console.log(     process.env.RecruiterID)
        res.status(200).json({ token, RecName, Vavancy })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// login a Admin
const loginAdmin = async (req, res) => {
    const { logName, password } = req.body
    try {
        const Adminnn = await Admin.login(logName, password)

        // create a token
        const tokenn = createToken(Adminnn._id)
        console.log(tokenn)
        const RecName = Adminnn.name

        console.log(RecName)
        // process.env.RecruiterID=Recruiters._id
        // console.log(     process.env.RecruiterID)
        res.status(200).json({ tokenn, RecName })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// signup a Recruiter

const signupRecruiter = async (req, res) => {
    const { logName, password, name } = req.body

    try {
        const Recruiters = await Recruiter.signup(logName, password, name)
        // create a token
        const token = createToken(Recruiters._id)
        const RecName = Recruiters.name
        const Vavancy = Recruiters.Vacancies
        const ID = Recruiters._id

        res.status(200).json({ logName, RecName, token, Vavancy, ID })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}



// signup a Admin

const signupAdmin = async (req, res) => {
    const { logName, password, name } = req.body

    try {
        const Adminnn = await Admin.signup(logName, password, name)
        // create a token
        const tokenn = createToken(Adminnn._id)
        const RecName = Adminnn.name

        const ID = Adminnn._id

        res.status(200).json({ logName, RecName, tokenn, ID })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


/*const AddRecruiterJobVscancy = async (req, res) => {
    const user_id = req.Recruiter._id
    console.log("enterrrrr AddRecruiterJobVscancy")
    const { VACANCYLIST } = req.body
 

    console.log("enterrrrr AddRecruiterJobVscancy2222")

    try {
     
        console.log("===========================")

        console.log(user_id)
        const RecruiterJobVacancy = await Recruiter.findOneAndUpdate({ _id: user_id }, {
            ...req.body
        },
            console.log("Recruiter is updated")
        )
        //  const Vacanciessss = await Recruiter.updateRecruiter(Vacancies,id)



        //res.status(200).json({ RecruiterJobVacancy })
    } catch (error) {
        console.log("enterrrrr AddRecruiterJobVscancy33333")

        res.status(400).json({ error: error.message })
    }
}*/

module.exports = { loginRecruiter, signupRecruiter, /*AddRecruiterJobVscancy*/ signupAdmin,loginAdmin}