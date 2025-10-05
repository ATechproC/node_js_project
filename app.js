const express = require("express");
const app = express();

const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

const mongoose = require("mongoose");
const User = require("./models/user");

app.use(express.static('public'))

require("dotenv").config();


// connect Live reload :

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname + "/public");
liveReloadServer.watch(__dirname + "/views");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

app.set("view engine", "ejs");

app.get("/new-user", (req, res) => {
    res.render("userInfo")
});

app.get("/", (req, res) => {
    res.send('this is the home page')
})

// Post : 

app.use(express.urlencoded({ extended: true }));

app.post("/new-user", async (req, res) => {

    const { userName } = req.body;

    const newUser = new User();
    newUser.userName = userName;
    await newUser.save();

    res.redirect("/");
})

// Delete Method : 

app.delete("/new-user/:userId", async (req, res) => {

    const { userId } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        res.json(deletedUser);

    } catch (err) {
        console.log("error happened while trying deleted the user with Id ", userId, err)
    }
})

//  get all Users from DB : 

app.get("/users", async (req, res) => {

    try {
        const allUsers = await User.find();
        res.json(allUsers)
    } catch (err) {
        console.log("error happened while trying fetching all users : ", err)
    }
})

// get the user with the following id : 

app.get("/users/:userId", async (req, res) => {

    const { userId } = req.params;

    try {
        const user = await User.findById(userId)
        res.json(user);
    } catch (err) {
        console.log("error while fetching the user with id ", userId, " : ", err)
    }
})

// get all data from DB and show it to the user : 

// get all users from DB and show them : 

app.get("/show-users", async (req, res) => {
    try {
        const allUsers = await User.find();
        res.render("show-users", { title: "Users", data: allUsers })
    } catch (err) {
        console.log("error happened while trying showing all users : ", err)
    }
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(3000, () => {
            console.log("http://localhost:3000");
        })
    })

