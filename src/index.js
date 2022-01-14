const express = require('express');
const { fstat } = require("fs")
const fs = require('fs');
const PORT = process.env.port || 6969;
const api = express();
const { arrayBuffer, json } = require("stream/consumers");
const WgPath = './src/Data/wgs.json';
const valid = require('./Validate.js');


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

    api.put("/wg/:wgID", (req, res) => {

        let thisWG = Wgs.find(wg => wg.wgID == parseInt(req.params.wgID));
        if (!thisWG) res.status(404).send('WG not found');

        thisWG.PersonCount = req.body.PersonCount;
        if (!valid.validateWG(thisWG)) {
            res.status(400).send("Bad Request");
        } else {

            newData = JSON.stringify(Wgs);

            fs.writeFile(WgPath, newData, 'utf8', function (err) {
                if (err) {
                    return console.log(err);

                }
                console.log("The file was saved!");
                res.status(201).send("updated successfully!");

            });
        }
    });

    api.put("/wg/:wgID/ShoppingList/:productID", (req, res) => {

        let thisWG = Wgs.find(wg => wg.wgID == parseInt(req.params.wgID));
        if (!thisWG) res.status(404).send('WG not found');

        let thisProduct = thisWG.ShoppingList.find(list => list.ProductID == parseInt(req.params.productID));
        if (!thisProduct) res.status(404).send('Product not found');
        thisProduct.Product = req.body.ProductName;
        thisProduct.Price = req.body.Price;

        if (!valid.validateProduct(thisProduct)) {
            res.status(400).send("Bad Request");
        } else {
            newData = JSON.stringify(Wgs);

            fs.writeFile(WgPath, newData, 'utf8', function (err) {
                if (err) {
                    return console.log(err);

                }
                console.log("The file was saved!");
                res.status(201).send("updated successfully!");
            });
        }
    });

    api.delete("/wg", (req, res) => {

        Wgs.splice(0, Wgs.length);
        var newData = JSON.stringify(Wgs);

        fs.writeFile(WgPath, newData, 'utf8', function (err) {
            if (err) {
                return console.log(err);

            }
            console.log("The file was saved!");

        });
        res.status(200).send("deleted succesfully!");
    });



    api.delete("/wg/:ID", (req, res) => {
        let thisWG = Wgs.find(wg => wg.wgID == parseInt(req.params.ID));
        if (!thisWG) res.status(404).send('WG not found');


        Wgs.splice(thisWG, 1);



        var newData = JSON.stringify(Wgs);

        fs.writeFile(WgPath, newData, 'utf8', function (err) {
            if (err) {
                return console.log(err);

            }
            console.log("The file was saved!");

        });
        res.status(200).send("deleted succesfully!");
    });

    api.delete("/wg/:wgID/ShoppingList", (req, res) => {

        let thisWG = Wgs.find(wg => wg.wgID == parseInt(req.params.wgID));
        if (!thisWG) res.status(404).send('WG not found');

        thisWG.ShoppingList.splice(0, thisWG.ShoppingList.length);
        newData = JSON.stringify(Wgs);

        fs.writeFile(WgPath, newData, 'utf8', function (err) {
            if (err) {
                return console.log(err);

            }
            console.log("The file was saved!");
            res.status(200).send("deleted successfully!");
        });
    });

    api.delete("/wg/:wgID/ShoppingList/:productID", (req, res) => {

        let thisWG = Wgs.find(wg => wg.wgID == parseInt(req.params.wgID));
        if (!thisWG) res.status(404).send('WG not found');

        let thisProduct = thisWG.ShoppingList.find(list => list.ProductID == parseInt(req.params.productID));
        if (!thisProduct) res.status(404).send('Product not found');

        thisWG.ShoppingList.splice(thisProduct, 1);
        newData = JSON.stringify(Wgs);



        fs.writeFile(WgPath, newData, 'utf8', function (err) {
            if (err) {
                return console.log(err);

            }
            console.log("The file was saved!");
            res.status(200).send("deleted successfully!");
        });
    });

    api.get("/wg/:wgID/shoppinglist/:productID", (req, res) => {
        let thisWG = Wgs.find(wg => wg.wgID == parseInt(req.params.wgID));
        if (!thisWG) res.status(404).send('WG not found');

        let thisProduct = thisWG.ShoppingList.find(list => list.ProductID == parseInt(req.params.productID));
        if (!thisProduct) res.status(404).send('Product not found');


        res.status(200).send(thisProduct);
    });


    api.get("/wg/:ID/shoppinglist", (req, res) => {
        let thisWG = Wgs.find(wg => wg.wgID == parseInt(req.params.ID));
        if (!thisWG) res.status(404).send('WG not found');
        res.status(200).send(thisWG.ShoppingList);
    });

    api.get("/wg/:ID", (req, res) => {

        let thisWG = Wgs.find(wg => wg.wgID == parseInt(req.params.ID));

        if (!thisWG) res.status(404).send('WG not found');
        res.status(200).send(thisWG);
    });

    api.get("/wg", (req, res) => {

        res.status(200).send(Wgs);
    });

    api.post("/wg", (req, res) => {

        let newID;

        Wgs.forEach(element => {
            if (element.wgID == 1) newID = Wgs.length + 1;
            else newID = 1;

        });

        const newWG = {
            ID: newID,
            PersonCount: req.body.PersonCount,
            Price: 0,
            PricePerPerson: 0,

        }
        if (!valid.validateWG(newWG)) {
            return res.status(400).send("Bad Request");
        } else {

            Wgs.push(newWG);

            newData = JSON.stringify(Wgs);

            fs.writeFile(WgPath, newData, 'utf8', function (err) {
                if (err) {
                    return console.log(err);

                }
                console.log("The file was saved!");
                res.status(201).send("created successfully!");

            });


        }
    });

    api.post("/wg/:wgID/ShoppingList/", (req, res) => {

        let newID;

        Wgs[req.params.wgID - 1].ShoppingList.forEach(element => {
            if (element.ID == 1) newID = Wgs[req.params.wgID - 1].ShoppingList.length + 1;
            else newID = 1;

        });

        const newProduct = {
            ProductID: newID,
            Product: req.body.ProductName,
            Price: req.body.Price
        }

        if (!valid.validateProduct(newProduct)) {
            res.status(400).send("Bad Request");
        } else {
            Wgs[req.params.wgID - 1].ShoppingList.push(newProduct);
            Wgs[req.params.wgID - 1].ShoppingList.forEach(element => {
                Wgs[req.params.wgID - 1].Price = Wgs[req.params.wgID - 1].Price + element.Price;
            });
            Wgs[req.params.wgID - 1].PricePerPerson = Wgs[req.params.wgID - 1].Price / Wgs[req.params.wgID - 1].PersonCount;

            newData = JSON.stringify(Wgs);

            fs.writeFile(WgPath, newData, 'utf8', function (err) {
                if (err) {
                    return console.log(err);

                }
                console.log("The file was saved!");
                res.status(201).send("created successfully!");



            });
        }


    });




});





