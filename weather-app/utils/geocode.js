const request = require("request");
const chalk = require("chalk");

const url = (address) => {
  return (
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYW5udWx1cyIsImEiOiJja2JlOHg2bDMwamZiMnlzN3Y2ZmNwOTVhIn0._6exkToyKFxbvNG19KKmXA"
  );
};

const geocode = (address, callback) => {
  let latitude, longitude, message, location;

  request(
    {
      url: url(address),
      json: true,
    },
    (error, response, body) => {
      if (error) {
        message = "Unable to find location";
      } else if (body) {
        const coordinate = body.features[0].center;
        latitude = coordinate[1];
        longitude = coordinate[0];
        location = body.features[0].place_name;
      } else {
        message = "Unable to locate the data";
      }
      callback(message, { latitude, longitude, location });
    }
  );
};

module.exports = geocode;
