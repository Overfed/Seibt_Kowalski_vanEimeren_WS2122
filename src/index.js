const express = require('express');
const PORT = process.env.port || 6969;
const api = express();
const { fstat } = require("fs")
const fs = require('fs');
const { arrayBuffer, json } = require("stream/consumers");
const WgPath = './src/Data/wgs.json';

api.use(express.json());

api.listen(PORT, () => {
    console.log("API läuft!")
});

api.get('/', (req, res) => {
    console.log(req);
    res.send('Hello World!');
});

fs.readFile(WgPath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return
    }

    let Wgs = JSON.parse(data);

    api.get("/wg/:wgID/shoppinglist/:productID", (req, res) => {

        res.status(200).send(Wgs[req.params.wgID - 1].ShoppingList[req.params.productID-1]);
    });


    api.get("/wg/:ID/shoppinglist", (req, res) => {

        res.status(200).send(Wgs[req.params.ID - 1].ShoppingList);
    });

    api.get("/wg/:ID", (req, res) => {

        res.status(200).send(Wgs[req.params.ID - 1]);
    });

    api.get("/wg", (req, res) => {

        res.status(200).send(Wgs);
    });

    api.post("/wg", (req, res) => {


        const newWG = {
            ID : Wgs.length + 1,
            PersonCount : req.body.PersonCount,
            Price  : 0,
            PricePerPerson: 0,

        }

        Wgs.push(newWG);

        newData = JSON.stringify(Wgs);

        fs.writeFile(WgPath, newData, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");

        });

        res.status(201).send(console.log(Wgs));

    });

    api.post("/wg/:wgID/ShoppingList/", (req, res) => {


        const newProduct = {
            ProductID: Wgs[req.params.wgID-1].ShoppingList.length+1 ,
            Product: req.body.ProductName,
            Price: req.body.Price
        }

        Wgs[req.params.wgID-1].ShoppingList.push(newProduct);

        newData = JSON.stringify(Wgs);

        fs.writeFile(WgPath, newData, 'utf8', function (err) {
            if (err) {
                return console.log(err);
                res.code(500); 
            }
            console.log("The file was saved!");
            res.status(201).send("created successfully!");

        });

      
    });

});





