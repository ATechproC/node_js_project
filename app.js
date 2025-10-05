const express = require("express");
require("dotenv").config();

const mongoose = require("mongoose");

const app = express();

app.get("/", (req, res) => {
    res.send("this is the home page")
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(3000, () => {
        console.log("http://localhost:3000")
    })
})

