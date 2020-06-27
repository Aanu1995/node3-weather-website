const express = require("express");

// json
const placeholder = require("./placeholder.json");

const app = express();

app.get("/", (req, res) => {
  res.send(placeholder);
});

app.get("/products", (req, res) => {
  console.log(req.query.search);
  res.send({
    date: "19/06/2020",
    products: [],
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
