const express = require('express');

const api = express();
api.listen(3000, () => {
    console.log("API läuft!")
});

api.get('/', (req, res) => {
    console.log(req);
    res.send('Hello World!');
});

//Funktioniert noch nicht, Error: "Cannot PUSH /"
api.post('/add', (req, res) => {
    res.send('Es funktioniert!');
});
