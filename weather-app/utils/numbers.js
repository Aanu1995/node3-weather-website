const request = require("request");
const chalk = require("chalk");

const numbers = (number, callback) => {
  const url = "http://numbersapi.com/" + number;
  request({ url: url, json: true }, (error, response, body) => {
    let error_message, trivia;
    if (error) {
      error_message = "Unable to connect to the server";
    } else {
      trivia = body;
    }
    callback(error_message, trivia);
  });
};

module.exports = numbers;
