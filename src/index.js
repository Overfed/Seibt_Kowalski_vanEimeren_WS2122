const express = require('express');
const PORT = process.env.port || 6969;
const api = express();

api.listen(PORT, () => {
    console.log("API läuft!")
});

api.get('/', (req, res) => {
    console.log(req);
    res.send('Hello World!');
});

//Funktioniert noch nicht, Error: "Cannot PUSH /"
/*
api.post('/add', (req, res) => {
    res.send('Es funktioniert!');
});
*/


api.get('/wg', (req, res) => {
   
    res.status(200).send({
        WG: 'TestWG1'


    })
});