const express = require('express')
var path = require('path');
var XLSX = require('xlsx');
var multer = require('multer');
const { v4 } = require('uuid');
const VacancyModel = require('../models/Vacancy')

const CandidateModel = require('../models/Candidate')

const { uploadToCloudinary, removeFromCloudinary } = require('../services/cloudinary')
// controller functions
const { loginRecruiter, signupRecruiter } = require('../controllers/Recruiters')
const { AddRecruiterJobVscancy, createVacancy } = require('../controllers/VacancyController')
const router = express.Router()
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const requireAuth = require('../middleware/requireAuth')
var FileReader = require('filereader')
const {
    getAllCandidate, createCandidate, getSingleCandidate, getSendEmail, getSingleCandidatInfo, WelcomeInterviewPageForeCandidate
} = require('../controllers/CandidateController')
const { AddCandidateToVacancy, getVacancy, deleteVacancy, getSingleVacancy, getSingleVacancyName, getOpenVacancy, getCandidateLength, ChangeClosedVacancyStatus, UpdateVacanyStatusToClosed, getClosedVacancy, EnetrVacancyInfo, EnetrVacancyInfoForeQuestion } = require('../controllers/VacancyController')
const streamifier = require('streamifier')
// require auth for all Positions routes
//router.use(requireAuth)

// login route
router.post('/login', loginRecruiter)

// signup route
router.post('/signup', signupRecruiter)

//GET a  WelcomeInterviewPageForeCandidate
router.get('/WelcomeInterviewPageForeCandidate/:CandidateDocID', WelcomeInterviewPageForeCandidate)

//GET a  EnetrVacancyInfo
router.get('/EnetrVacancyInfo/:VacancyID', EnetrVacancyInfo)



//GET a  EnetrVacancyInfo
router.get('/EnetrVacancyInfoForeQuestion/:VacancyyyID', EnetrVacancyInfoForeQuestion)


//multer
//var storage2 = multer.diskStorage({});
//var upload2 = multer({ storage2: storage2 });



//multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '/public/'))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + ".webm");
    },
});

var upload = multer({ storage: storage });



// Upload User Image
router.post("/InterviewVideo/:CandidateDocID/:CandidateID", /*upload2.array("CandidateInterview", 10),*/upload.single("CandidateInterview"), async (req, res) => {
    console.log(req.file)
    const { CandidateDocID } = req.params
    const { CandidateID } = req.params
    let num = parseInt(CandidateID)
    console.log(CandidateID)
    console.log(req.file.path)
    console.log(CandidateDocID)
    try {
        const data = await uploadToCloudinary(req.file.path, "CandidateInterview");
        var feed = { imageUrl: data.url, publicId: data.public_id };
        var dataaa = [];
        dataaa.push(feed);
        const CandidateALLINFO = await CandidateModel.findOneAndUpdate(
            {
                _id: CandidateDocID,
            },
            {
                $push: {
                    "Candidate_Info.$[orderItem].RECORDS": { imageUrl: data.url, publicId: data.public_id }
                }
            },
            {
                arrayFilters: [{
                    "orderItem.id":num ,
                }]
            }
        )

        if (CandidateALLINFO) {
            console.log(CandidateALLINFO)
            console.log("Candidate Interviewwwww imported successfully.");
        }
        console.log(data.url)
        console.log("222222222...............2222222222");

        console.log(data.url)
        console.log("222222222...............2222222222");

        console.log("Candidate Interview uploaded with success!");
        res.status(200).json("Alllll Done for the storing in cloudinary")
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
});



/*const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '/public/'))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + ".webm");
    },
});

var upload2 = multer({ storage: storage2 });*/


// Upload User Image
/*router.post("/InterviewFullVideo/:CandidateDocID/:CandidateID", upload2.single("FullCandidateInterview"), async (req, res) => {
    console.log(req.file)
    const { CandidateDocID } = req.params
    const { CandidateID } = req.params
    let num = parseInt(CandidateID)
    console.log(CandidateID)
    console.log(req.file.path)
    console.log(CandidateDocID)
    try {
        const data = await uploadToCloudinary(req.file.path, "FullCandidateInterview");
        var feed = { imageUrl: data.url, publicId: data.public_id };
        var dataaa = [];
        dataaa.push(feed);
        const CandidateALLINFO = await CandidateModel.findOneAndUpdate(
            {
                _id: CandidateDocID,
            },
            {
                $set: {
                    "Candidate_Info.$[orderItem].FullRecords":  data.url
                }
            },
            {
                arrayFilters: [{
                    "orderItem.id":num ,
                }]
            }
        )

        if (CandidateALLINFO) {
            console.log(CandidateALLINFO)
            console.log("Candidate FulllllllInterviewwwww imported successfully.");
        }
        console.log(data.url)
        console.log("222222222...............2222222222");

        console.log(data.url)
        console.log("222222222...............2222222222");

        console.log("Candidate FullllllllInterview uploaded with success!");
        res.status(200).json("Alllll Done for the storing in cloudinary")
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
});*/


module.exports = router