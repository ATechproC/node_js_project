const mongoose = require("mongoose");

const {Schema, model} = mongoose;

const articleSchema = new Schema({
    userName : String
})

const User = model("User", articleSchema);

module.exports = User;