const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const User = mongoose.model("User", {
    name: {
        type: String,
        trim: true,
        uppercase: true,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [
            true, "email address is required"
        ],
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: "Incorrect Email address"
        }
    },
    password: {
        type: String,
        required: [
            true, "Invalid password input"
        ],
        trim: true,
        minlength: 7,
        validate: {
            validator: (value) => {
                return !value.toLowerCase().includes("password");
            },
            message: "password can not be use as your password"
        }
    },
    age: {
        type: Number,
        required: [
            true, "age is required"
        ],
        validate: {
            validator: (value) => {
                return value > 0;
            },
            message: "age must be a positive number"
        }
    },
    picture: {
        type: String,
        default: "",
        set: (v) => v + "github.com"
    },
    socialmediahandles: {
        type: Map
    },
    bestfruits: {
        type: []
    }
});

const me = new User({
    name: "Aanu Olakunle",
    password: "OAPpelumi1",
    email: "olakunleaanu@gmail.com",
    age: 25,
    socialmediahandles: {
        twitter: "@AANUPELUMI",
        linkedln: "linkedln.com/Aanu-olakunle",
        github: "Aanu1995"
    },
    bestfruits: ["Mango", "Apple", "Pineapple", "Banana"]
});

me.save((error, product) => {
    if (error) {
        return console.log(error.message);
    }
    console.log(product);
});
