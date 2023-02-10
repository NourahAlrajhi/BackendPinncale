const Positions = require('../models/Position')
const mongoose = require('mongoose')
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI);




// get all Position
const getPosition = async (req, res) => {

    const Positionss = await Positions.find({}).sort({ createdAt: -1 })
    console.log("gott allllll");
    res.status(200).json(Positionss)
}

// get a single Positions
const getPositions = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Position' })
    }

    const Positionss = await Positions.findById(id)

    if (!Positionss) {
        return res.status(404).json({ error: 'No such Positions' })
    }

    res.status(200).json(Positionss)
}


// create new Positions
const createPositions = async (req, res) => {
    console.log("Enterrrrrrrrrrrr here22222222")

    const user_id = req.Recruiter._id
    const { /*questions*//*expectedAnswers*/description, name, noticePeriod, /*imprtanceOfQ*/ arr, ExpectedSalary } = req.body

    const Posi = await Positions.findOne({ name: name.toLowerCase() })

    console.log(description)
    if (Posi) {
        return res.status(400).json({ error: 'Position Already Exists' })
    }


    let emptyFields = []

    if (!name) {
          return res.status(400).json({ error: 'Please Fill The Position Name field' })
        emptyFields.push('name')
        console.log("111111--------------------------")
    }
    if (!description) {
         return res.status(400).json({ error: 'Please Fill The Job Description Field' })

        emptyFields.push('description')
        console.log("2222222--------------------------")
    }
    if (!noticePeriod) {
        return res.status(400).json({ error: 'Please Fill The Notice Period Field' })
        emptyFields.push('noticePeriod')
        console.log("3333333--------------------------")
    }

    var index;
    for (index = 0; index < arr.length; ++index) {
        if (!arr[index].questions) {
             return res.status(400).json({ error: 'Please Fill The Question Field' })
            emptyFields.push('questions')
            console.log("4444444--------------------------")
        }
        if (!arr[index].expectedAnswers) {
             return res.status(400).json({ error: 'Please Fill The ExpectedAnswer Field' })

            emptyFields.push('expectedAnswers')
            console.log("5555555--------------------------")
        }
        if (!arr[index].imprtanceOfQ) {
               return res.status(400).json({ error: 'Please Select The Importance Field' })

            emptyFields.push('imprtanceOfQ')
            console.log("6666666--------------------------")
        }
    }
    if (!ExpectedSalary) {
          return res.status(400).json({ error: 'Please Fill The  ExpectedSalary Field' })

        emptyFields.push('ExpectedSalary')
        console.log("777777777--------------------------")

    }

    console.log("--------------------------")
    if (emptyFields.length > 0) {
        console.log("-222-------------------------")
        // return res.status(400).json({ error: 'Cannot Add Position If Field Is Empty', emptyFields })
    }

    // add doc to db
    try {
        console.log("Enterrrrrrrrrrrr here0000000")
        const NameAfterNormalizing = name.toLowerCase()
        const Position = await Positions.create({/*questions*//*expectedAnswers*/description, name:NameAfterNormalizing, noticePeriod, /*imprtanceOfQ*/ arr, ExpectedSalary, user_id })
        res.status(200).json(Position)
        console.log("Enterrrrrrrrrrrr here11111")
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

// delete a Position
const deletePosition = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Position' })
    }

    const Position = await Positions.findOneAndDelete({ _id: id })

    if (!Position) {
        return res.status(400).json({ error: 'No such Position' })
    }

    res.status(200).json(Position)
}

// update a Position
const updatePosition = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Position' })
    }

    const { /*questions*//*expectedAnswers*/description, name, noticePeriod, /*imprtanceOfQ*/ arr, ExpectedSalary } = req.body

    let emptyFields = []

    if (!name) {
        emptyFields.push('name')
    }
    if (!description) {
        emptyFields.push('description')
    }
    if (!noticePeriod) {
        emptyFields.push('noticePeriod')
    }
    var index;
    for (index = 0; index < arr.length; ++index) {
        if (!arr[index].questions) {
            emptyFields.push('questions')
        }
        if (!arr[index].expectedAnswers) {
            emptyFields.push('expectedAnswers')
        }
        if (!arr[index].imprtanceOfQ) {
            emptyFields.push('imprtanceOfQ')
        }
    }


    if (!ExpectedSalary) {
        emptyFields.push('ExpectedSalary')

    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }


    const Position = await Positions.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!Position) {
        return res.status(400).json({ error: 'No such Position' })
    }

    res.status(200).json(Position)
}


module.exports = {
    getPosition,
    getPositions,
    createPositions,
    deletePosition,
    updatePosition
}