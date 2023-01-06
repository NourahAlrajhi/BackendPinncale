const express = require('express')

// controller functions
const { loginRecruiter,signupRecruiter} = require('../controllers/Recruiters')
const {AddRecruiterJobVscancy,createVacancy}= require('../controllers/VacancyController')
const router = express.Router()

const requireAuth = require('../middleware/requireAuth')

const {
    getAllCandidate, createCandidate, getSingleCandidate, getSendEmail,getSingleCandidatInfo,WelcomeInterviewPageForeCandidate
} = require('../controllers/CandidateController')
const { AddCandidateToVacancy, getVacancy, deleteVacancy, getSingleVacancy, getSingleVacancyName, getOpenVacancy, getCandidateLength,ChangeClosedVacancyStatus , UpdateVacanyStatusToClosed,getClosedVacancy,EnetrVacancyInfo,EnetrVacancyInfoForeQuestion} = require('../controllers/VacancyController')

// require auth for all Positions routes
//router.use(requireAuth)

// login route
router.post('/login', loginRecruiter)

// signup route
router.post('/signup', signupRecruiter)

//GET a  WelcomeInterviewPageForeCandidate
router.get('/WelcomeInterviewPageForeCandidate/:CandidateDocID',WelcomeInterviewPageForeCandidate )

//GET a  EnetrVacancyInfo
router.get('/EnetrVacancyInfo/:VacancyID',EnetrVacancyInfo )



//GET a  EnetrVacancyInfo
router.get('/EnetrVacancyInfoForeQuestion/:VacancyyyID',EnetrVacancyInfoForeQuestion )

module.exports = router