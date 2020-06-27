const express = require("express");
require("./db/mongoose");
const User = require("./models/user");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(400).send({ error: error.message });
    });
  //   user.save((error, result) => {
  //     if (result) {
  //       return res.send(result);
  //     }
  //     return console.log(error);
  //   });
});

app.listen(port, () => {
  console.log("Server is up on port: " + port);
});
