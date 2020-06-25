const chalk = require("chalk");

const express = require("express");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const request = require("request");
const numbers = require("./utils/numbers.js");

// const address = process.argv[2];

// var number = process.argv[2];

// if (!address) {
// return console.log(chalk.red("please enter command line argument"));
// }

// geocode(address, (error, { latitude, longitude, location } = {}) => {
// if (error) {
//     return console.log(chalk.red(error));
// }

// forecast(longitude, latitude, (error, forecast) => {
//     if (error) {
//       return console.log("Error:", error);
//     }
//     console.log(location);
//     console.log("Data:", forecast);
// });
// });

// if (!number || !Number.isInteger(Number(number))) {
// console.log(chalk.red("Please enter an integer"));
// return;
// }

// numbers(number, (error, trivia) => {
// if (error) {
//     console.log(chalk.red(error));
//     return;
// }
// console.log(chalk.green(trivia));
// });

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    if (!req.query.search) {
        req.query.search = "Alabama";
    }
    geocode(req.query.search, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            console.log(chalk.red(error));
            return res.send({error});
        }
        forecast(longitude, latitude, (error = "error", forecast) => {
            if (forecast) {
                return res.send({search: req.query.search, location, temperature: forecast});
            }
            console.log("error:", error);
            return res.send({error});
        });
    });
});

app.get('/chaynik', (req, res) => {
    res.send({
        image_url: 'https://s3-alpha-sig.figma.com/img/a21e/5b6c/fc1c11f00c69e1c5dc49c43cec7fc0a7?Expires=1593993600&Signature=W~VImiyAGJVhqJ-ZzfZoKVygVDt37xLe1he1SS9tsDsoqKuEsGd0SUlWF3~Z9JNHz4ydCxwz665k9v3ORFGKv0~dBKR~FWwwLd6kjdN1q~yzPo88eDSc~8lIPTNHZ2vRi2S1kEX9US5MQyfOOdXfoIc2WSylbj8GouJNqqaKC75qbIWa774FFjzAEPcmyYOTcGtj3PtIyjIjXuq83JF8741QUTVC5CD6S6N99tvtYvkXNmY0q8CPyi7VF~xspeTnrpFOSmN3kk7VbPB~uHJO194je01gFhzet11W73LEZMVE966h6sDoDuYaLOEIKRGS7RpAwvhXQDe~rCQ1PVEEhg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'
    },)
});

app.get("*", (req, res) => {
    res.send({error: "error"});
});

app.listen(port, () => {
    console.log("Server is up on port " + port);
});
