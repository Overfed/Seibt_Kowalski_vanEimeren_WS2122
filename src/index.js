const express = require('express');
const PORT = process.env.port || 6969;
const api = express();
const readfile = require('./fileReader.js');

api.listen(PORT, () => {
    console.log("API läuft!")
});

api.get('/', (req, res) => {
    console.log(req);
    res.send('Hello World!');
});
var data = readfile.readData('./src/Data/produkte.json');
api.get("/produkt/:ID", (req, res) => {
    
    res.send(data(console.table));
 
    
});

api.post("/produkt/", (req,res) => {
    var edit = readfile.writeData('./src/Data/produkte.json')
    

});

api.get("/wg", (req, res) => {
    
    res.status(200).send(data(console.log));
});
