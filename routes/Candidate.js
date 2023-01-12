
var path = require('path');
var XLSX = require('xlsx');
var multer = require('multer');
const RecruitersrRoutes = require('../routes/Recruiter')
const Candidate = require('../routes/Candidate')
const CandidateModel = require('../models/Candidate')
const RecruitereModel = require('../models/Recruiters')

const VacancyModel = require('../models/Vacancy')
const express = require('express')
const {
    getAllCandidate, createCandidate, getSingleCandidate, getSendEmail, getSingleCandidatInfo, WelcomeInterviewPageForeCandidate
} = require('../controllers/CandidateController')
const { AddCandidateToVacancy, getVacancy, deleteVacancy, getSingleVacancy, getSingleVacancyName, getOpenVacancy, getCandidateLength, ChangeClosedVacancyStatus, UpdateVacanyStatusToClosed, getClosedVacancy, EnetrVacancyInfo, EnetrVacancyInfoForeQuestion } = require('../controllers/VacancyController')


const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
// require auth for all Positions routes
router.use(requireAuth)

// GET all Question
router.get('/', getAllCandidate)

//GET a single Positions
router.get('/Candidate/:id', getSingleCandidate)

//GET a  ExpiredVacancy
router.get('/VacancyExpired', ChangeClosedVacancyStatus)



//GET a single Vacancy
router.get('/List', getVacancy)

//GET a single Vacancy
router.get('/ListOpen', getOpenVacancy)

//GET a single Vacancy
router.get('/ListClosed', getClosedVacancy)

//GET a single VacancyName
router.get('/VacancyName/:id', getSingleVacancyName)




// UPDATE a VacancyStatusToClosed
router.patch('/VacancyStatusToClosed', UpdateVacanyStatusToClosed)

// DELETE a Positions
router.delete('/:id', deleteVacancy)

//GET a single Positions
router.get('/:id', getSingleVacancy)

router.post('/sendEmail', getSendEmail)


//GET a /CandidateLength
router.get('/CandidateLength/:id', getCandidateLength)

//GET SingleCandidatInfo
router.get('/CandidateInfo/:id3/:id2', getSingleCandidatInfo)

//multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '/public/'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "--" + file.originalname)
        path.extname(file.originalname)
    }
});

var upload = multer({ storage: storage });


router.post('/UPLOAD', upload.single('uploadfile'), async (req, res) => {

    const user_id = req.Recruiter._id
    console.log(user_id)
    console.log("===========================")
    //const { VACANCYID } = req.body
    console.log(req.file)
    console.log("=============")
    // console.log(selectedFile)
    console.log("=============")

    console.log("Start finding the right id");









    var workbook = XLSX.readFile(req.file.path);
    var sheet_name_list = workbook.SheetNames;
    console.log(sheet_name_list); // getting as Sheet1

    sheet_name_list.forEach(async function (y) {
        var worksheet = workbook.Sheets[y];
        //getting the complete sheet
        // console.log(worksheet);

        var headers = {};
        var data = [];
        for (z in worksheet) {
            if (z[0] === "!") continue;
            //parse out the column, row, and value
            var col = z.substring(0, 1);
            // console.log(col);

            var row = parseInt(z.substring(1));
            // console.log(row);

            var value = worksheet[z].v;
            // console.log(value);

            //store header names
            if (row == 1) {
                headers[col] = value;
                // storing the header names
                continue;
            }

            if (!data[row]) data[row] = {};
            data[row][headers[col]] = value;
        }
        //drop those first two rows which are empty
        data.shift();
        data.shift();

        const payload = data.map((item, index) => {
            return {
                id: index + 1,
                RECORDS:[{}],
                Result:"Not Attended",
                ...item
            }
        });

        console.log(payload);

        let CandidateList = new CandidateModel({ Candidate_Info: payload });
        CandidateList = await CandidateList.save();
        let Recruiterrr = await RecruitereModel.findById(user_id);
        let VacancyId = await Recruiterrr.Vacancies[Recruiterrr.Vacancies.length - 1];
        console.log(VacancyId);
        console.log("22222222222");
        let query = { '_id': VacancyId }
        let update = {
            $set: { CandidateList: payload.length },
            $push: { Candidate: CandidateList._id }
        }


        //  let Vac = await VacancyModel.findById(VacancyId);

        // Vac.Candidate.push(CandidateList._id);
        // Vac = await Vac.save();




        const VACANCYYYYYYYYYY222 = await VacancyModel.findOneAndUpdate(
            query, update)


        // VACANCYYYYYYYYYY222 = await VACANCYYYYYYYYYY222.save();
        if (VACANCYYYYYYYYYY222) {
            console.log("Candidate imported successfully.");
        }



        res.status(200).json(CandidateList)

        console.log("Add the id succ");



    });





}

)






module.exports = router