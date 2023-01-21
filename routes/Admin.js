
var path = require('path');
var XLSX = require('xlsx');
var multer = require('multer');
const express = require('express')
const AdminAuth = require('../middleware/AdminAuth')

const Employees = require('../models/Employees')

const router = express.Router()
router.use(AdminAuth)

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


router.post('/UPLOADMPLOYEE/:EMPLOYEEID', upload.single('uploadfile'), async (req, res) => {
    const { EMPLOYEEID } = req.params
    console.log("===========================222222 Enter UPLOADMPLOYEE")
    const user_id = req.Admin._id
    console.log(user_id)
    console.log("===========================")
    //const { VACANCYID } = req.body
    console.log(req.file)
    console.log("=============")
    // console.log(selectedFile)
    console.log("=============")

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
        //v4()

        const payload = data.map((item, index) => {
            return {
                IsAuth: false,
                ...item
            }
        });
        let flag = false
        let count = 0
        console.log(payload);
        let ISEXIST = await Employees.findById(EMPLOYEEID);
        payload && payload.map(async (data, i) => {
          
            console.log("[[[[[[[[[[[[")
            console.log(ISEXIST.Employee_Info)
            console.log("[[[[[[[[[[[[")

            ISEXIST.Employee_Info && ISEXIST.Employee_Info.map(async (ITEM, index) => {
                if (ITEM.Employee_ID === data.Employee_ID) {
                    console.log("enter the flag condition")
                    console.log(ITEM.Employee_ID )
                    console.log(data.Employee_ID)
                    flag = false
                    count++
                }else if(ITEM.Employee_ID !== data.Employee_ID){
                    console.log("enter the flag condition true")
                    console.log(ITEM.Employee_ID )
                    console.log(data.Employee_ID)
                    flag = true 
                   
                }



            })
            if( count>0){
                flag = false   
                count=0
            }

            if (flag) {
                const EmployeesALLINFO = await Employees.findOneAndUpdate(
                    {
                        _id: EMPLOYEEID,
                    },
                    {
                        $push: {
                            "Employee_Info": { IsAuth: false, Employee_Name: data.Employee_Name, Employee_ID: data.Employee_ID, Employee_UserName: data.Employee_UserName, Employee_Password: data.Employee_Password }
                        }
                    },

                )
            }



        })



        // let EmployeeList = new Employees({ Employee_Info: payload });
        // EmployeeList = await EmployeeList.save();

        /* if (EmployeeList) {
             console.log("EmployeeList imported successfully.");
         }*/
        res.status(200).json("Add the EmployeeList succ")

        console.log("Add the EmployeeList succ");
    });





}

)

router.get("/ListEmployee", async (req, res) => {

    const ListEmployee = await Employees.find({}).sort({ createdAt: -1 })
    console.log("gott allllll ListEmployee");
    res.status(200).json(ListEmployee)
})


router.post("/RemoveAUTH/:EmployeDocIDDD", async (req, res) => {
    const { EmployeDocIDDD } = req.params
    const { Employee_ID } = req.body

    console.log("Enter GIVEAUTH")
    const EmployeesALLINFO = await Employees.findOneAndUpdate(
        {
            _id: EmployeDocIDDD,
        },
        {
            $set: {
                "Employee_Info.$[orderItem].IsAuth": false
            }
        },
        {
            arrayFilters: [{
                "orderItem.Employee_ID": Employee_ID,
            }]
        }
    )


    if (EmployeesALLINFO) {
        console.log(EmployeesALLINFO)
        console.log("EmployeesALLINFO Interviewwwww imported successfully.");


        return res.status(400).json({ message: 'Alllll Done for the UnAuthorizationnnnnn EmployeesALLINFO' })

        // res.status(200).json("Alllll Done for the storing in cloudinary")
    }

})

router.post("/GIVEAUTH/:EmployeDocID", async (req, res) => {
    //  const { Employee_ID } = req.params
    const { EmployeDocID } = req.params
    const { Employee_ID } = req.body
    // let num = parseInt(Employee_ID)
    //  console.log(num)
    console.log("Enter GIVEAUTH")
    const EmployeesALLINFO = await Employees.findOneAndUpdate(
        {
            _id: EmployeDocID,
        },
        {
            $set: {
                "Employee_Info.$[orderItem].IsAuth": true
            }
        },
        {
            arrayFilters: [{
                "orderItem.Employee_ID": Employee_ID,
            }]
        }
    )


    if (EmployeesALLINFO) {
        console.log(EmployeesALLINFO)
        console.log("EmployeesALLINFO Interviewwwww imported successfully.");


        return res.status(400).json({ message: 'Alllll Done for the storing in EmployeesALLINFO' })

        // res.status(200).json("Alllll Done for the storing in cloudinary")
    }
})





module.exports = router