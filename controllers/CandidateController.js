var path = require('path');
var XLSX = require('xlsx');
var multer = require('multer');
const Recruiter = require('../models/Recruiters')
const Vacancy = require('../models/Vacancy')
const Candidate = require('../models/Candidate')
const mongoose = require('mongoose')
var json2xlsx = require('node-json-xlsx');
const { MongoClient } = require('mongodb');
const nodeMailer = require('nodemailer');
const client = new MongoClient(process.env.MONGO_URI);
var fs = require("fs");

//multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage });



// get all Candidate
const getAllCandidate = async (req, res) => {
    const Candidatessssssss = await Candidate.find({}).sort({ createdAt: -1 })
    console.log("gott allllll Candidatessssssss");
    console.log(Candidatessssssss)
    res.status(200).json(Candidatessssssss)
}


// create new Candidate
const createCandidate = async (req, res) => {
    const { VACANCYID } = req.body
    console.log("=============")
    console.log(req.file)
    console.log("=============")
    importFile('../public' + '/Uploads/' + req.file.filename);
    function importFile(filePath) {
        //  Read Excel File to Json Data
        var arrayToInsert = [];
        csvtojson().fromFile(filePath).then(source => {
            // Fetching the all data from each row
            for (var i = 0; i < source.length; i++) {
                console.log(source[i]["Candidate_Name"])
                var singleRow = {
                    Candidate_Name: source[i]["Candidate_Name"],
                    Candidate_Email: source[i]["Candidate_Email"],
                    Candidate_Phone_Number: source[i]["Candidate_Phone_Number"],
                    Result: source[i]["Result"],
                };
                arrayToInsert.push(singleRow);
            }
            //inserting into the table Candidate
            Candidate.insertMany(arrayToInsert, (err, result) => {
                if (err) console.log(err);
                if (result) {

                    let VACANCYYYYYYYYYY = Vacancy.findById(VACANCYID);
                    VACANCYYYYYYYYYY.Candidate.push(result._id);
                    VACANCYYYYYYYYYY = VACANCYYYYYYYYYY.save();

                    console.log("File imported successfully.");
                    // res.redirect('/home')



                }
            });

        })
    }





}


const getSingleCandidate = async (req, res) => {
    console.log("Enterrrrrrrrrrrr getSingleCandidate")
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Candidate' })
    }
    console.log("Start searching")
    const Candidatess = await Candidate.findById(id)
    if (!Candidatess) {
        return res.status(404).json({ error: 'No such Candidates' })
    }
    console.log("Founnndddddddddddd")

    res.status(200).json(Candidatess)
}


const getSendEmail = async (req, res) => {
    console.log("Enter the final destination getSendEmail");

    console.log("req body", req.body);

    const { /*CandidateEmail*/ CandidateALLINFO, EmailBody, EmailSubject, e, PositionChoosen, Datee, Time, CandidateDocId } = req.body


    // let userMail = req.body.CandidateEmail;
    // let userMessage = req.body.EmailBody;
    // let userTitle = req.body.EmailSubject;
    console.log("====================================");
    //console.log(CandidateEmail)
    console.log(CandidateALLINFO)

    console.log("====================================");


    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }
    )


//http://localhost:3000
//https://pinnacle-recruiting.herokuapp.com/
    CandidateALLINFO.forEach(function (INFO) {
        console.log(INFO.CandidateEmail + "-----------" + INFO.CandidateID)
        ///start of the email iteration
        var message = {
            from: process.env.EMAIL,
            //  to: [CandidateEmail],
            subject: EmailSubject,
            text: EmailBody,
            html: `
            <h2>Dear Candidate,</h2>
            <h4>Thank you for your application to the ${PositionChoosen} role at ELM.</h4>\
            <h4>We would like to invite you to interview for the role by joining this <a href="https://pinnacle-recruiting.herokuapp.com/Interview_welcome_screen/${e}/${CandidateDocId}/${INFO.CandidateID}">link,</a> make sure to open the interview through Google Chrome Browser.</h4>\
            <h4>The interview will last between 10 - 30 minutes in total.</h4>\
            <h4>Please note that the link will expire on the following date and time:</h4>\
            <h4>Date : ${(new Date(Datee).getDate()) + "/" + (new Date(Datee).getMonth() + 1) + "/" + (new Date(Datee).getFullYear())}</h4>\
            <h4>Time : ${(new Date(Datee).getHours()+3) + ":" + (new Date(Datee).getMinutes())}</h4>\

            ` ,
        };
        message.to = INFO.CandidateEmail
        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log("error in sending mail", err)
                return res.status(400).json({
                    message: `error in sendin mail ${err}`
                })
            } else {
                console.log("getSendEmail Senttttttt");
                console.log("sucessfully send the mail", info)
                return res.json({
                    message: info
                })
            }


        })

    })
    ///end of the email iteration
}


const getSingleCandidatInfo = async (req, res) => {
    console.log("Resultttttttttttttttttttttttttttttenetrrrrr");

    const { id3 } = req.params
    const { id2 } = req.params
    const Candidatess = await Candidate.findById(id2).select('Candidate_Info')
    console.log("Resultttttttttttttttttttttttttttttt1111");
    console.log(Candidatess)
    //const RESULT= Candidatess.find( { "Candidate_Info": { id: id } }, );
    console.log("Resultttttttttttttttttttttttttttttt");
    //console.log(RESULT);
    console.log("Resultttttttttttttttttttttttttttttt");

    res.status(200).json(Candidatess)
}


const WelcomeInterviewPageForeCandidate = async (req, res) => {
    const { CandidateDocID } = req.params
    const Candidatess = await Candidate.findById(CandidateDocID).select('Candidate_Info')

    console.log("Resultttttttttttttttttttttttttt of WelcomeInterviewPageForeCandidate");
    console.log(Candidatess)
    console.log("Resultttttttttttttttttttttttttt of WelcomeInterviewPageForeCandidate");
    res.status(200).json(Candidatess)
}

const GetExcelSheetForThisVacancy = async (req, res) => {
    console.log("Enterrrrr GetExcelSheetForThisVacancy!!!");
    const { CandidatInfo } = req.body
    const { VACANCYNAME } = req.body
    /*const filtered = CandidatInfo.map(obj => {
        console.log(obj);

        // get totals to add them later to keep column order (or use `header` param for columns order)
        const {
            RECORDS,
            Candidate_Name,
            Candidate_Email,
            ...rest
        } = obj;
    
        // flatten..
        RECORDS.map(el => {
            rest[el['InterviewUrl']] = el.imageUrl;
        });
    
        return {...rest,
            Candidate_Name,
            Candidate_Email
        };
    });*/


   


    const workSheet = XLSX.utils.json_to_sheet(CandidatInfo);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Candidates");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook,`${VACANCYNAME}.xlsx`);

    res.status(200).json("Excel loadedddddddd")


}

module.exports = {
    getAllCandidate,
    createCandidate,
    getSingleCandidate,
    getSendEmail,
    getSingleCandidatInfo,
    WelcomeInterviewPageForeCandidate,
    GetExcelSheetForThisVacancy
}