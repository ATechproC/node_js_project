const express = require("express");
const router = express.Router();

const { 
    user_post, 
    user_id_delete, 
    user_all_get,
    user_id_get,
    users_get
} = require("../controllers/apiEndPointsController");

// Post : 

router.post("/new-user", user_post)

// Delete Method : 

router.delete("/new-user/:userId", user_id_delete)

//  get all Users from DB : 

router.get("/users", user_all_get)

// get the user with the following id : 

router.get("/users/:userId", user_id_get)

// get all data from DB and show it to the user : 

// get all users from DB and show them : 

router.get("/show-users",  users_get);

module.exports = router;