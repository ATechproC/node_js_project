const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");

require("dotenv").config();

const app = express();

app.set("view engine", "ejs");

app.get("/new-user", (req, res) => {
    res.render("userInfo")
});

// Post : 

app.use(express.urlencoded({ extended: true }));

app.post("/new-user", async (req, res) => {

    const {userName} = req.body;
    
    const newUser = new User();
    newUser.userName = userName;
    await newUser.save();

    res.json(newUser);
})

// Delete Method : 

app.delete("/new-user/:userId", async (req, res) => {

    const {userId} = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        
        res.json(deletedUser);

    }catch(err) {
        console.log("error happened while trying deleted the user with Id ", userId, err)
    }
})

//  get all Users from DB : 

app.get("/users", async (req, res) => {

    const allUsers = await User.find();

    res.json(allUsers)
})

// get the user with the following id : 

app.get("/users/:userId", async (req, res) => {

    const {userId} = req.params;
    
    try {
        const user = await User.findById(userId)
        res.json(user);
    }catch(err) {
        console.log("error while fetching the user with id ", userId ," : ", err)
    }
})

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(3000, () => {
        console.log("http://localhost:3000");
    })
})

