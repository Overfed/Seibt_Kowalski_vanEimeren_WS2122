const express = require('express');
const PORT = process.env.port || 6969;
const api = express();
const readfile = require('./fileReader.js');
const { fstat } = require("fs")
const fs = require('fs');
const { arrayBuffer, json } = require("stream/consumers");
const produktePath = './src/Data/produkte.json';

api.listen(PORT, () => {
    console.log("API läuft!")
});

api.get('/', (req, res) => {
    console.log(req);
    res.send('Hello World!');
});


api.get("/wg", (req, res) => {

    res.status(200).send(data(console.log));
});


fs.readFile(produktePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return
    }

    var produkte = JSON.parse(data);
    api.get("/produkt/:ID", (req, res) => {

        res.send(produkte[req.params.ID - 1]);
    });


    api.get("/produkt", (req, res) => {

        res.send(produkte);
    });

    api.post("/produkt", (req, res) => {

        
        var newData = JSON.stringify(produkte);
        

        fs.writeFile(produktePath, newData, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
            
        });
   
        res.send(console.log(produkte));

    });

});





