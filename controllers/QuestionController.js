const Question = require('../models/Questions')
const mongoose = require('mongoose')
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI);


// get all Position
const getAllQuestion = async (req, res) => {
    const QQuestionn = await Question.find({}).sort({ createdAt: -1 })
    console.log("gott allllll Question");
    console.log(QQuestionn)
    res.status(200).json(QQuestionn)
}


// create new Positions
const createQuestion = async (req, res) => {
    console.log("Enterrrrrrrrrrrr here22222222 createQuestion")

    const user_id = req.Recruiter._id
    const { Question } = req.body
    // add doc to db
    try {
        console.log("Enterrrrrrrrrrrr here0000000 createQuestion")
        const Questionnnnsss = await Question.create({Question})
        res.status(200).json(Questionnnnsss)
        console.log("Enterrrrrrrrrrrr here11111")
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}


module.exports = {
    getAllQuestion,
    createQuestion
}