const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const costumerSchema = new Schema({
    firstName: String,
    lastName: String,
    age: Number,
    email: String,
    country: String,
    gender: String,
    phoneNumber: String
}, {
    timestamps: true
})

const Costumer = model("costumer", costumerSchema);

module.exports = Costumer;