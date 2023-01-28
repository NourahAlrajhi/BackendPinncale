const express = require('express')
var path = require('path');
var XLSX = require('xlsx');
var multer = require('multer');
const { v4 } = require('uuid');
const VacancyModel = require('../models/Vacancy')
//const {exec} = require('child_process')
const CandidateModel = require('../models/Candidate')
const spawn = require('child_process').spawn;
const { uploadToCloudinary, removeFromCloudinary } = require('../services/cloudinary')
// controller functions
const { loginRecruiter, signupRecruiter, signupAdmin, loginAdmin, deleteRecruiter } = require('../controllers/Recruiters')
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
router.post('/signup/:Employee_ID', signupRecruiter)

// login Admin route
router.post('/login/Admin', loginAdmin)

// signup Admin route
router.post('/signup/Admin', signupAdmin)

//GET a  WelcomeInterviewPageForeCandidate
router.get('/WelcomeInterviewPageForeCandidate/:CandidateDocID', WelcomeInterviewPageForeCandidate)

//GET a  EnetrVacancyInfo
router.get('/EnetrVacancyInfo/:VacancyID', EnetrVacancyInfo)


//GET a  EnetrVacancyInfo
router.get('/RemoveRecruiter/:Employee_IDDD', deleteRecruiter)

//GET a  EnetrVacancyInfo
router.get('/EnetrVacancyInfoForeQuestion/:VacancyyyID', EnetrVacancyInfoForeQuestion)


//multer
//var storage2 = multer.diskStorage({});
//var upload2 = multer({ storage2: storage2 });


// exec('mkfifo mypipe',(err)=>{
//     if(err){
//         console.error(err);
//         return
//     }
//     console.log('Named pipe created')
// });


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
router.post("/InterviewVideo/:CandidateDocID/:CandidateID/:QuestionID/:VacancyID/:NumOfInterviewCandidate", /*upload2.array("CandidateInterview", 10),*/upload.single("CandidateInterview"), async (req, res) => {
    const { QuestionID } = req.params
    const { VacancyID } = req.params
    const { NumOfInterviewCandidate } = req.params
    console.log(req.file)
    const { CandidateDocID } = req.params
    const { CandidateID } = req.params
    let num = parseInt(CandidateID)
    let num2 = parseInt(NumOfInterviewCandidate)
    console.log(CandidateID)
    console.log(req.file.path)
    console.log(CandidateDocID)
    try {
        const data = await uploadToCloudinary(req.file.path, "CandidateInterview");
        var feed = { imageUrl: data.url, publicId: data.public_id, QuestionAndAnswerID: QuestionID };
        var dataaa = [];
        dataaa.push(feed);
        const CandidateALLINFO = await CandidateModel.findOneAndUpdate(
            {
                _id: CandidateDocID,
            },
            {
                $push: {
                    "Candidate_Info.$[orderItem].RECORDS": { imageUrl: data.url, publicId: data.public_id, QuestionAndAnswerID: QuestionID }
                }
            },
            {
                arrayFilters: [{
                    "orderItem.id": CandidateID,
                }]
            }
        )

        if (CandidateALLINFO) {
            console.log(CandidateALLINFO)
            console.log("Candidate Interviewwwww imported successfully.");

           // res.status(400).json({ data.url, data.public_id, QuestionID })

            return   res.status(400).json(feed) //res.status(400).json({ message: 'Alllll Done for the storing in cloudinary' })

            // res.status(200).json("Alllll Done for the storing in cloudinary")
        }
        console.log(data.url)
        console.log("222222222...............2222222222");

        console.log(data.url)
        console.log("222222222...............2222222222");

        console.log("Candidate Interview uploaded with success!");

    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
});


router.post("/IncremntInterviewdCandidate/:CandidateDocID/:CandidateID/:VacancyID/:NumOfInterviewCandidate", async (req, res) => {

    const { VacancyID } = req.params
    const { NumOfInterviewCandidate } = req.params

    const { CandidateDocID } = req.params
    const { CandidateID } = req.params
    let num = parseInt(CandidateID)
    let num2 = parseInt(NumOfInterviewCandidate)
    console.log(CandidateID)

    console.log(CandidateDocID)

    let query = { '_id': VacancyID }
    let update = {
        $set: { InterviewedCandidates: num2 + 1 },
    }
    const VACANCYYYYYYYYYY222 = await VacancyModel.findOneAndUpdate(
        query, update)
    if (VACANCYYYYYYYYYY222) {
        console.log("Enter To Incremntttttttttttt Succssfully111100001111")
        return res.status(400).json({ message: 'Increment Succssfully' })
    }

})


router.get("/SetIsEnterToInterview/:CandidateDocIDDDD/:CandidateIDDDD", async (req, res) => {
    const { CandidateDocIDDDD } = req.params
    const { CandidateIDDDD } = req.params

    console.log("Enter GIVEAUTH")
    const CandidateModelALLINFO = await CandidateModel.findOneAndUpdate(
        {
            _id: CandidateDocIDDDD,
        },
        {
            $set: {
                "Candidate_Info.$[orderItem].IsStartingTheInterview": true
            }
        },
        {
            arrayFilters: [{
                "orderItem.id": CandidateIDDDD,
            }]
        }
    )


    if (CandidateModelALLINFO) {
        console.log(CandidateModelALLINFO)
        console.log("CandidateModelALLINFO Interviewwwww Enterrrr imported successfully.");


        return res.status(400).json({ message: 'Alllll Done for the Interviewwwww Enterrrr imported successfully' })

    }

})


router.post("/SendingDataToModel/:CandidateDocIDDD/:CandidateIDDD", async (req, res) => {

    const { CandidateDocIDDD } = req.params
    const { CandidateIDDD } = req.params

   //steps this is array of question
    //stepsForImportance this is array of importance
    // RECORDLISTTT this is array of records
    // stepsForQuestionId this is array of question ids in correct order
    const { steps, stepsForImportance, RECORDLISTTT ,stepsForQuestionId} = req.body
    console.log("COLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
    console.log(steps)
    console.log(stepsForImportance)
    console.log(RECORDLISTTT)
    console.log("COLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")

 const jsonData1 =JSON.stringify(RECORDLISTTT)
 const jsonDataShare = RECORDLISTTT +'/n'+steps+'/n'+stepsForImportance


 const py = spawn('python', ['routes/Test.py', jsonData1,steps,stepsForImportance,stepsForQuestionId]);

let dataFromPython=''
 py.stdout.on('data' , (data)=>{
    dataFromPython += data.toString();
    console.log(`studo:${data}`);
 })

 py.stderr.on('data' , (data)=>{
    console.log(`stderr:${data}`);
 })


 py.on('close' , async(code)=>{
       // Parse the data as JSON
       const data = JSON.parse(dataFromPython);
       // Access the double array
       const Var1 = data.doubleArray
       console.log("1111111111111111111")
       console.log(Var1)
       // Access the double variable
       const Var2 = data.doubleVariable
       console.log("2222222222222222")
       console.log(Var2)
       // Access the string
       const Var3 = data.string
       console.log("3333333333333")
       console.log(Var3)

       const CandidateALLINFO = await CandidateModel.findOneAndUpdate(
           {
               _id: CandidateDocIDDD,
           },
           {
               $set: {
                   "Candidate_Info.$[orderItem].ResultPersentage": Var2,
                   "Candidate_Info.$[orderItem].Result": Var3,
                   "Candidate_Info.$[orderItem].SpecificResultPersentage": Var1,
                   "Candidate_Info.$[orderItem].FillerWords": Var1,
               }
           },
           {
               arrayFilters: [{
                   "orderItem.id": CandidateIDDD,
               }]
           }
       )
   
   
       if (CandidateALLINFO) {
           console.log(CandidateALLINFO)
           console.log("CandidateALLINFO Interviewwwww imported successfully.");
   
   
         //  return res.status(400).json({ message: 'Alllll Done for the UnAuthorizationnnnnn CandidateALLINFO' })
   
           // res.status(200).json("Alllll Done for the storing in cloudinary")
       }


    console.log(`child process exited with code ${code}`);
 })


})


module.exports = router