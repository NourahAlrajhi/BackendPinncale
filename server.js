require('dotenv').config()
var bodyParser = require('body-parser');
var path = require('path');
var XLSX = require('xlsx');
const express = require('express')
const mongoose = require('mongoose')
const Position = require('./routes/Position')
const Question = require('./routes/QuestionRouts')
const RecruitersrRoutes = require('./routes/Recruiter')
const Candidate = require('./routes/Candidate')
const CandidateModel = require('./models/Candidate')
const RecruitereModel = require('./models/Recruiters')

const VacancyModel = require('./models/Vacancy')
const requireAuth = require('./middleware/requireAuth')

const csvtojson = require('csvtojson')

const cors = require('cors')
var XLSX = require('xlsx');
var multer = require('multer');
// express app
const app = express()
app.use(cors());

//static folder patha
//app.use(express.static(path.resolve(__dirname, 'public')));

//app.set('view engine', 'ejs')

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

///Adding some comment to check the connection

app.use(function (req, res, next) {
  let allowedOrigins = ["https://pinnacle-recruiting.herokuapp.com/"];
  let origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Key, x-auth-token, multipart/form-data"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, OPTIONS"
  );
next();
})

// routes
app.use('/api/Position', Position)
app.use('/api/Recruiter', RecruitersrRoutes)
app.use('/api/Question', Question)
app.use('/api/Candidate', Candidate)


// connect to db
mongoose.connect(process.env.MONGO_URI);


  // listen for requests
  app.listen(process.env.PORT, () => {
    console.log('connected to db & listening on port', process.env.PORT)
  })



