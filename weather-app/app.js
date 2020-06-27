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
        image_url: 'https://s3-alpha-sig.figma.com/img/0199/0d3d/73bf9601bc7cea7b89a5818d0c88e403?Expires=1593993600&Signature=OGn2GN7sTZm5bPhynneXSpSFNp0DFdH0R5nK37pZaSmq7OCg2WtgBpdPXKZCXpIB8BAhVqdoe2NxGlJN9fFeulRWhP6cb1gSg0S5nmFhqLqpfPlpLzB1VuBamYeDsj5Rl3ulXpbztB3zyf6F4tnRSLHFRAPCzey59y73OSH2dsxBNsajAQ11KLN0qg6HvmlkrqChudHHPYWvxf5tRqhm6spUKo5G92rb4E8LBVpCoWfQdXeVz9gmiWe-wtdCWJU~LTCogK7TJLyBBOxsI249yiU3zV-IWo5Xz6NuSiT9n4U48NbWHKiEYRx4v7aDR9H5QnEBoxUlcwfqyBcM~J6m0Q__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
        primary_color: "#6C6C6C"
    },)
});

app.get("*", (req, res) => {
    res.send({error: "error"});
});

app.listen(port, () => {
    console.log("Server is up on port " + port);
});
