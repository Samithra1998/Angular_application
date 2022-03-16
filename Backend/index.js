const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const http = require('http').createServer(app).listen(3000);

app.use(cors());
app.use(bodyparser.json());

//db connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'hr_managment',
    port : 3306
});

//check db connection
db.connect(err => {
    if(err) {
        console.log(err,'dbError');
    }else {
        console.log('Database connected...');
    }
})

//get all data
app.get('/user',(req,res) => {
    
    // let qr = 'select e.eid,e.fName,e.lName,e.address,s.noOfHours,s.date,s.amount,s.signature,b.bCode,d.dName,d.phone from employee e,salary s,bank b,emp_dept t,department d where s.salaryId=e.salaryId and e.eId=b.eId and e.eId=t.eId and d.dId=t.dId'
    let qr = `SELECT id,eId,fName,lName,address,noOfHours,date,amount,signature,bCode,
              dName,phone FROM  hrmangmenttable`

    db.query(qr,(err,result) => {
        if(err) {
            console.log(err,'Errors');
        }

        if(result.length>0) {
            res.send({
                message : 'Displaying the JSON array of all data...',
                data : result
            });
        }
    });

});

//get single record
app.get('/user/:id',(req,res) => {

    let empId = req.params.id
    //let sQr = `select e.eid,e.fName,e.lName,e.address,s.noOfHours,s.date,s.amount,s.signature,b.bCode,d.dName,d.phone from employee e,salary s,bank b,emp_dept t,department d where s.salaryId=e.salaryId and e.eId=b.eId and e.eId=t.eId and d.dId=t.dId and e.eId = ${empId} `
    let sQr = `SELECT id,eId,fName,lName,address,noOfHours,date,amount,signature,bCode,
               dName,phone FROM  hrmangmenttable WHERE id = '${empId}'`

    db.query(sQr,(err,result) => {
        if(err) {
            console.log(err,'Error has occured..')
        }
        if (result.length > 0) {
            res.send({
                message : 'Displaying the single record...',
                data : result
            });
        }
        else {
            res.send({
                message : 'Data not found...'
            });
        }
    })
    console.log(req.params.eId);
});

//Add data
app.post('/user',(req,res) => {
    console.log(req.body,'post data')

    let eId = req.body.eId;
    let fName = req.body.fName;
    let lName = req.body.lName;
    let address = req.body.address;
    let noOfHours = req.body.noOfHours;
    let date = req.body.date;
    let amount = req.body.amount;
    let signature = req.body.signature;
    let bCode = req.body.bCode;
    let dName = req.body.dName;
    let phone = req.body.phone;

    let qr = `INSERT INTO hrmangmenttable(eId,fName,lName,address,noOfHours,date,amount,signature,bCode,dName,phone)
              VALUES ('${eId}','${fName}','${lName}','${address}',${noOfHours},'${date}',${amount},'${signature}',
              '${bCode}','${dName}',${phone})`;
    
    db.query(qr,(err,result) => {
        if(err) {
            console.log(err,'Error occured while inserting..')
        }
        res.send({
            message : 'Data added successfully..'
        });
    });
});

//Update data

app.put('/user/:id',(req,res) => {
    console.log(req.body,'Data updated')

    let qId = req.params.id;

    let eId = req.body.eId;
    let fName = req.body.fName;
    let lName = req.body.lName;
    let address = req.body.address;
    let noOfHours = req.body.noOfHours;
    let date = req.body.date;
    let amount = req.body.amount;
    let signature = req.body.signature;
    let bCode = req.body.bCode;
    let dName = req.body.dName;
    let phone = req.body.phone;

    let qr = `UPDATE hrmangmenttable SET eId='${eId}',fName='${fName}',lName='${lName}',address='${address}',
              noOfHours=${noOfHours},date='${date}',amount=${amount},signature='${signature}',bCode='${bCode}',
              dName='${dName}',phone='${phone}' WHERE id=${qId}`

    db.query(qr,(err,result) => {
        if(err) {
            console.log(err,'Error occured while updating...')
        }
        res.send({
            message : 'Data Updated Successfully..'
        });
    });
});

//Delete data

app.delete('/user/:id',(req,res) => {

    let qId = req.params.id;
    let qr = `DELETE FROM hrmangmenttable WHERE id = ${qId}`;

    db.query(qr,(err,result) => {
        if(err) {
            console.log(err,'Error occured while deleting..')
        }
        res.send({
            message : 'Data deleted successfully...'
        });
    });
});



app.listen(1000,() => {
    console.log('Server Running...')
});