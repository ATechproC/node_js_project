const express = require("express");

const mongoose = require("mongoose");

const app = express();

app.get("/", (req, res) => {
    res.send("this is the home page")
});



