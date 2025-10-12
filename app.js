const express = require("express");
const app = express();

const mongoose = require("mongoose");

const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

app.use(express.static('public'));

require("dotenv").config();

app.use(express.urlencoded({ extended: true }));

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname + "/public");
liveReloadServer.watch(__dirname + "/views");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

// delete method : 

var methodOverride = require('method-override')
app.use(methodOverride('_method'))

app.set("view engine", "ejs");

// import routes :

const allRoutes = require("./routes/allRoutes");
app.use(allRoutes);

const addCostumerRoute = require("./routes/addCostumer");
app.use(addCostumerRoute);

const editCostumerInfoRoute = require("./routes/editCostumerInfo");
app.use(editCostumerInfoRoute);

const searchRoute = require("./routes/search");
app.use(searchRoute);

const apiEndpointsRoute = require("./routes/apiEndpoints");
app.use(apiEndpointsRoute);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(3000, () => {
            console.log("http://localhost:3000");
        })
})
