const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Aanu Olakunle",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Aanu Olakunle",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    help:
      "Welcome to Annulus Site. Please let us know how we can serve you better",
    title: "Help",
    name: "Aanu Olakunle",
  });
});

app.get("/weather", (req, res) => {
  res.send([
    {
      temperature: 18,
      location: "Lagos State",
    },
    {
      temperature: 30.0,
      location: "Kano State",
    },
    {
      temperature: 20,
      location: "Ibadan State",
    },
  ]);
});

app.get("*", (req, res) => {
  res.send("My 404 page");
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
