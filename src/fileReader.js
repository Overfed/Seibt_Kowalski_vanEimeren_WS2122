const { fstat } = require("fs")
const fs = require('fs');
const { arrayBuffer, json } = require("stream/consumers");

function readData(path) {

    return function (callback) {
        try {
            fs.readFile(path, 'utf8', (err, data) => {
                if (err) {
                    console.error(err)
                    return
                }

                callback(JSON.parse(data))
            });
        }
        catch (error) {

            console.log(error);

        }
    }
}