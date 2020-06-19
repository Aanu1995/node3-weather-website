const request = require("request");

const coordinate = (lat, long) => {
  return (
    "http://api.weatherstack.com/current?access_key=479d252713490be4d552fe2cdc271575&query=" +
    lat +
    "," +
    long
  );
};

const forecast = (long, lat, callback) => {
  request(
    {
      url: coordinate(lat, long),
      json: true,
    },
    (error, response, body) => {
      let msg, data;
      if (error) {
        msg = "Unable to connect to weather service!";
      } else if (body) {
        data = body.current.temperature;
      } else {
        msg = body.error.info;
      }
      callback(msg, data);
    }
  );
};

module.exports = forecast;
