const { default: validator } = require("validator");

console.log("hello world");

console.log(validator.isEmail("olakunleaanu@gmail.com"));
console.log(validator.isAlphanumeric("#$^"));
console.log(validator.isBoolean(true));
