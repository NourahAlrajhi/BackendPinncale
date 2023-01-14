const Vacancy = require('../models/Vacancy')
const jwt = require('jsonwebtoken')
const Recruiterrrrrrrr = require('../models/Recruiters')
const Candidate = require('../models/Candidate')
const mongoose = require('mongoose')


const AddRecruiterJobVscancy = async (req, res) => {
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
}





// create new Vacancy
const createVacancy = async (req, res) => {
    const user_id = req.Recruiter._id
    console.log("Enterrrrrrrrrrrr createVacancy")

    const { Position, title, Esubject, Ebody, linkExpDate, linkExpTime/*Candidate ,Pass,fail,notAttended*/, status } = req.body
    const { Positionnn, titleee, Esubjecttt, Ebodyyy, linkExpDateee, linkExpTimeee, statusss } = req.body

    if (statusss == "Open") {


        let emptyFields = []

        if (!Esubjecttt) {
            //   return res.status(400).json({ error: 'Please fill the Position Name field' })
            emptyFields.push('title')
            console.log("111111--------------------------")
        }




        console.log("--------------------------")
        if (emptyFields.length > 0) {
            console.log("-222-------------------------")
            return res.status(400).json({ error: 'Cannot Save Job Vacancy If Field Is Empty', emptyFields })
        }


        try {

            console.log("Enterrrrrrrrrrrr here0000000 opennnnnnnnn")

            let newMessage = new Vacancy({ Position: Positionnn, title: titleee, Esubject: Esubjecttt, Ebody: Ebodyyy, linkExpDate: linkExpDateee, linkExpTime: linkExpTimeee, status: statusss, user_id,InterviewedCandidates:0 });
            console.log(Positionnn)
            console.log(titleee)
            console.log(statusss)
            console.log(Esubjecttt)
            console.log(Ebodyyy)
            console.log(linkExpDateee)
            console.log(linkExpTimeee)
            console.log(user_id)

            newMessage = await newMessage.save();
            console.log("----------------------------------")

            console.log(newMessage)
            let Recruiterrr = await Recruiterrrrrrrr.findById(user_id);
            console.log("----------------------------------2222222222")

            Recruiterrr.Vacancies.push(newMessage._id);
            console.log("---------------------------------333333333")

            Recruiterrr = await Recruiterrr.save();
            console.log("---------------------------------44444")


            console.log("Enterrrrrrrrrrrr here33333333")
            console.log("Enterrrrrrrrrrrr here11111Vacnacyyyyyyyyy")
            res.status(200).json(newMessage)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }


    } else {





        let emptyFields = []

        if (!Esubject) {
            //   return res.status(400).json({ error: 'Please fill the Position Name field' })
            emptyFields.push('title')
            console.log("111111--------------------------")
        }




        console.log("--------------------------")
        if (emptyFields.length > 0) {
            console.log("-222-------------------------")
            return res.status(400).json({ error: 'Cannot Send Job Vacancy If Field Is Empty', emptyFields })
        }

        // add doc to db
        try {

            console.log("Enterrrrrrrrrrrr here0000000")

            let newMessage = new Vacancy({ Position, title, Esubject, Ebody, linkExpDate, linkExpTime, status, user_id,InterviewedCandidates:0 });
            console.log(Position)
            console.log(title)
            console.log(Esubject)
            console.log(Ebody)
            console.log(linkExpDate)
            console.log(linkExpTime)
            console.log(status)
            console.log(user_id)

            newMessage = await newMessage.save();
            console.log("----------------------------------")

            console.log(newMessage)
            let Recruiterrr = await Recruiterrrrrrrr.findById(user_id);
            console.log("----------------------------------2222222222")

            Recruiterrr.Vacancies.push(newMessage._id);
            console.log("---------------------------------333333333")

            Recruiterrr = await Recruiterrr.save();
            console.log("---------------------------------44444")


            console.log("Enterrrrrrrrrrrr here33333333")
            console.log("Enterrrrrrrrrrrr here11111Vacnacyyyyyyyyy")
            res.status(200).json(newMessage)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}


const AddCandidateToVacancy = async (req, res) => {
    app.use(requireAuth)
    const user_id = req.Recruiter._id
    console.log(user_id)
    console.log("===========================")
    //const { VACANCYID } = req.body
    console.log(req.file)
    console.log("=============")
    // console.log(selectedFile)
    console.log("=============")

    console.log("Start finding the right id");



    res.send("Single File uploaded successfully")


    /*importFile('../public' + '/Uploads/' + req.file.filename);
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
            CandidateModel.insertMany(arrayToInsert, (err, result) => {
                if (err) console.log(err);
                if (result) {
  
                   // let VACANCYYYYYYYYYY = Vacancy.findById(VACANCYID);
                    //VACANCYYYYYYYYYY.Candidate.push(result._id);
                    //VACANCYYYYYYYYYY = VACANCYYYYYYYYYY.save();
  
                    console.log("File imported successfully.");
                    // res.redirect('/home')
                }
            });
  
        })
    }*/




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
        console.log(data);
        const CandidateList = await CandidateModel.create({ Candidate_Info: data })
        console.log("ccccccccccccccccccccccccccccccccccccccccccccc");
        console.log(data.length);
        console.log("ccccccccccccccccccccccccccccccccccccccccccccc");

        let Recruiterrr = await RecruitereModel.findById(user_id);
        let VacancyId = await Recruiterrr.Vacancies[Recruiterrr.Vacancies.length - 1];
        console.log(VacancyId);
        console.log("22222222222");
        let Vac = await VacancyModel.findById(VacancyId);
        Vac.Candidate.push(CandidateList._id);
        Vac = await Vac.save();
        console.log("Add the id succ");



        // Recruiterrr.Vacancies.push(newMessage._id);


        // let Vacancyyy = await VacancyModel.findById(user_id);
        //Vacancyyy.Candidate.push(newMessage._id);
        //Vacancyyy = await Vacancyyy.save();



    });



    /* const user_id = req.Recruiter._id
     var workbook = XLSX.readFile(req.file.path);
     var sheet_namelist = workbook.SheetNames;
     var x = 0;
     sheet_namelist.forEach(element => {
         var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
         const Candidatessssssss = Candidate.insertMany(xlData, (err, data) => {
             if (err) {
                 console.log(err);
             } else {
                 console.log(data);
             }
             /*  Recruiter.updateOne({_id: user_id}, {
                   $push: {
                       Candidate: Candidatessssssss._id
                   }
                });*/


    // })
    //  x++;
    // }

    // );
    // res.status(200).json(Candidatessssssss)
    // res.redirect('/');





}



// get all Vacancy
const getVacancy = async (req, res) => {
    //ChangeClosedVacancyStatus()
    const user_id = req.Recruiter._id
    console.log(user_id)
    const VacList = await Recruiterrrrrrrr.findById(user_id).select('Vacancies')
    console.log(VacList)
    const VACANCY = await Vacancy.find({ _id: { $in: VacList.Vacancies }, "status": "Active" });
    console.log(VACANCY)
    //const VACANCY = await Vacancy.find({}).sort({ createdAt: -1 })
    console.log("gott allllll Vacancy");
    res.status(200).json(VACANCY)
}



const getOpenVacancy = async (req, res) => {


    const user_id = req.Recruiter._id
    console.log(user_id)
    const VacList = await Recruiterrrrrrrr.findById(user_id).select('Vacancies')
    console.log(VacList)
    const VACANCY = await Vacancy.find({ _id: { $in: VacList.Vacancies }, "status": "Open" });
    console.log(VACANCY)
    //const VACANCY = await Vacancy.find({}).sort({ createdAt: -1 })
    console.log("gott allllll VacancyOpen");
    res.status(200).json(VACANCY)

}


const getClosedVacancy = async (req, res) => {


    const user_id = req.Recruiter._id
    console.log(user_id)
    const VacList = await Recruiterrrrrrrr.findById(user_id).select('Vacancies')
    console.log(VacList)
    const VACANCY = await Vacancy.find({ _id: { $in: VacList.Vacancies }, "status": "Closed" });
    console.log(VACANCY)
    //const VACANCY = await Vacancy.find({}).sort({ createdAt: -1 })
    console.log("gott allllll VacancyClosed");
    res.status(200).json(VACANCY)

}


// delete a Position
const deleteVacancy = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Vacancy' })
    }

    const Position = await Vacancy.findOneAndDelete({ _id: id })

    if (!Position) {
        return res.status(400).json({ error: 'No such Vacancy' })
    }

    res.status(200).json(Position)
}

// get a single Positions
const getSingleVacancy = async (req, res) => {
    console.log("enterrrrrrr candidate")

    const { id } = req.params
    console.log(id)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Vacancy' })
    }
    const CandList = await Vacancy.findById(id).select('Candidate')
    console.log(CandList)
    const RealCand = await Candidate.findById(CandList.Candidate)
    console.log(RealCand)

    /* if (!Positionss) {
         return res.status(404).json({ error: 'No such Vacancy' })
     }*/

    res.status(200).json(RealCand)
}



// get Single VacancyName
const getSingleVacancyName = async (req, res) => {
    const { id } = req.params
    // console.log(user_id)
    // const VacList = await Recruiterrrrrrrr.findById( user_id ).select('Vacancies')
    //  console.log(VacList)
    const VACANCY = await Vacancy.findById(id);
    console.log(VACANCY)
    //const VACANCY = await Vacancy.find({}).sort({ createdAt: -1 })
    console.log("gott allllll Vacancy");
    res.status(200).json(VACANCY)
}




const getCandidateLength = async (req, res) => {
    const { id } = req.params
    const Candidateeee = await Candidate.findById(id).select('Candidate_Info');
    console.log(Candidateeee)
    res.status(200).json(Candidateeee)
}


const ChangeClosedVacancyStatus = async (req, res) => {
    console.log("Enterrrrrrr ChangeClosedVacancyStatus");

    let currentDate = new Date().toISOString()

    //let currentDate = new Date().toDateString();
    console.log(currentDate)
    const VACANCY = await Vacancy.find({ "linkExpDate": { $lte: currentDate } })
    console.log(VACANCY)

    res.status(200).json(VACANCY)


}

const UpdateVacanyStatusToClosed = async (req, res) => {
    console.log("Enter UpdateVacanyStatusToClosed");
    const { VacancyClosed } = req.body
    console.log("aaaaaaaaaaaaaaaaaaaaaa");
    console.log(VacancyClosed);
    console.log("aaaaaaaaaaaaaaaaaaaaaa");


    const VACANCY = await Vacancy.updateMany({ _id: { $in: VacancyClosed } }, {$set: { "status": "Closed" }},)

    if(VACANCY){
        console.log("Vacancy state Updated succfully");
    }

 

}

const EnetrVacancyInfo = async (req, res) => {
    const { VacancyID } = req.params

    const VACANCY = await Vacancy.findById(VacancyID);
    console.log("EnetrVacancyInfo aaaaaaaaaaaaaaaaaaaaaa");
    console.log(VACANCY);
    console.log(" EnetrVacancyInfo aaaaaaaaaaaaaaaaaaaaaa");
    res.status(200).json(VACANCY)

}

const EnetrVacancyInfoForeQuestion  = async (req, res) => {
    const { VacancyyyID } = req.params

    const VACANCY = await Vacancy.findById(VacancyyyID).select('Position');
    console.log("EnetrVacancyInfoForeQuestion aaaaaaaaaaaaaaaaaaaaaa");
    console.log(VACANCY);
    console.log(" EnetrVacancyInfoForeQuestion aaaaaaaaaaaaaaaaaaaaaa");
    res.status(200).json(VACANCY)

}

module.exports = { AddRecruiterJobVscancy, createVacancy, AddCandidateToVacancy, getVacancy, deleteVacancy, getSingleVacancy, getSingleVacancyName, getOpenVacancy, getCandidateLength,ChangeClosedVacancyStatus,UpdateVacanyStatusToClosed,getClosedVacancy ,EnetrVacancyInfo,EnetrVacancyInfoForeQuestion}