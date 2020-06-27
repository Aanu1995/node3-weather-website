const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
  name: {
    type: String,
    trim: true,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email address is required"],
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: "Incorrect Email address",
    },
  },
  password: {
    type: String,
    required: [true, "Invalid password input"],
    trim: true,
    minlength: 7,
    validate: {
      validator: (value) => {
        return !value.toLowerCase().includes("password");
      },
      message: "password can not be use as your password",
    },
  },
});

module.exports = User;
