const express = require('express')
const {
    getPosition,
    getPositions,
    createPositions,
    deletePosition,
    updatePosition
} = require('../controllers/PositionController')
const {createVacancy}= require('../controllers/VacancyController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all Positions routes
router.use(requireAuth)

// GET all Positions
router.get('/', getPosition)

//GET a single Positions
router.get('/:id', getPositions)

// POST a new Positions
router.post('/', createPositions)

// DELETE a Positions
router.delete('/:id', deletePosition)

// UPDATE a Positions
router.patch('/:id', updatePosition)


// Post a Recruiter vacancy
router.post('/Update', createVacancy)

module.exports = router