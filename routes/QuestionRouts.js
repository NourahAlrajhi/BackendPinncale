const express = require('express')
const {
    getAllQuestion,createQuestion
} = require('../controllers/QuestionController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
// require auth for all Positions routes
router.use(requireAuth)

// GET all Question
router.get('/', getAllQuestion)
// POST a new Question
router.post('/', createQuestion)

module.exports = router