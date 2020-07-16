
const express = require('express')
const app = express()
const port = 3000;
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

//write registration data to json
app.post('/save', (req, res) => {
    console.log(req);
    fs.writeFile('./db.json', JSON.stringify(req.body), 'utf8', (err, response) => {
        res.send('success')
    })
})

//read registrtion data from json
app.get('/get', (req, res) => {
 
    fs.readFile('./db.json', (err, response)=> {
        
        if(err) throw err;
        console.log("response" + response);
        let resp = "";
        if(response.length != 0){
            const userData = JSON.parse(response);
            console.log(userData);
             resp = {
                data: userData
            }
        }
            res.send(resp);       
    })
})

//write employee details to form
app.post('/management', (req, res) => {
    console.log(req);
    fs.writeFile('./manage.json', JSON.stringify(req.body), 'utf8', (err, response) => {
        res.send('success')
    })
})

//read employee deatils from jason
app.get('/getmanagement', (req, res) => {
    fs.readFile('./manage.json', (err, response)=> {
        if(err) throw err;
        console.log("response" + response);
        let resp = "";
        if(response.length != 0){
            const userData = JSON.parse(response);
            console.log(userData);
             resp = {
                data: userData
            }
        }
            res.send(resp);       
    })
})

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))