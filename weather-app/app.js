const chalk = require("chalk");

const express = require("express");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const request = require("request");
const numbers = require("./utils/numbers.js");

//const address = process.argv[2];

// var number = process.argv[2];

// if (!address) {
//   return console.log(chalk.red("please enter command line argument"));
// }

// geocode(address, (error, { latitude, longitude, location } = {}) => {
//   if (error) {
//     return console.log(chalk.red(error));
//   }

//   forecast(longitude, latitude, (error, forecast) => {
//     if (error) {
//       return console.log("Error:", error);
//     }
//     console.log(location);
//     console.log("Data:", forecast);
//   });
// });

// if (!number || !Number.isInteger(Number(number))) {
//   console.log(chalk.red("Please enter an integer"));
//   return;
// }

// numbers(number, (error, trivia) => {
//   if (error) {
//     console.log(chalk.red(error));
//     return;
//   }
//   console.log(chalk.green(trivia));
// });

const app = express();

app.get("/weather", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "please provide a valid address",
    });
  }
  geocode(req.query.search, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      console.log(chalk.red(error));
      return res.send({ error });
    }
    forecast(longitude, latitude, (error = "error", forecast) => {
      if (forecast) {
        return res.send({
          location,
          temperature: forecast,
        });
      }
      console.log("error:", error);
      return res.send({ error });
    });
  });
});

app.get("*", (req, res) => {
  res.send({
    error: "error",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
