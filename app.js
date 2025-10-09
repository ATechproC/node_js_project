const express = require("express");
const app = express();

const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

const mongoose = require("mongoose");
const User = require("./models/user");

app.use(express.static('public'))

require("dotenv").config();

// export costumer model :

const Costumer = require("./models/costumer");

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

// Moment library : 

const moment = require("moment");

app.set("view engine", "ejs");

// home page :

app.get("/", async (req, res) => {
    try {
        const costumers = await Costumer.find();
        res.render("index", { costumers, moment })
    } catch (err) {
        console.log("error happened while trying to fetch costumers data :", err)
    }
});

// add Costumer page :

app.get("/user/add.html", (req, res) => {
    res.render("user/add");
})

// View user info page : 

app.get("/user/:userId", async (req, res) => {
const {userId} = req.params;
try {
    const customersDetails = await Costumer.findById(userId);
    res.render("user/view", {customersDetails, moment});
}catch(err) {
    console.log("error happened while trying to get " + userId + " " + err)
}
})

// Edit user info page :

// app.get("/user/:userId", async (req, res) => {
//     const { userId } = req.params;
//     try {
//         const customersDetails = await Costumer.findById(userId);
//         res.render("user/edit", { customersDetails });
//     } catch (err) {
//         console.log("error happened while trying to get " + userId + " " + err)
//     }
// })

// search page :

app.get("/user/search.html", (req, res) => {
    res.render("user/search");
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

// Add new user :

app.post("/user/add.html", async (req, res) => {
    try {
        const newCostumer = new Costumer(req.body);
        await newCostumer.save();
        res.redirect("/user/add.html")
        console.log(req.body)
    } catch (err) {
        console.log("error happened while trying add a new costumer", err)
    }
})

// Edit the user info :

// app.put("/user/edit/:userId", async (req, res) => {
//     const { userId } = req.params;
//     const {firstName, lastName, phoneNumber, email, age,gender, country} = req.body;
//     try {
//         const editedUser = await Costumer.findById(userId);
//         editedUser = {
//             ...editedUser, 
//             firstName, 
//             lastName, 
//             phoneNumber, 
//             email, 
//             age, 
//             gender, 
//             country}
//         res.redirect("/");
//     } catch (err) {
//         console.log("error happened while trying to modify info : ", userId, err)
//     }
// })

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(3000, () => {
            console.log("http://localhost:3000");
        })
    })

