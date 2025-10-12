const express = require("express");
const router = express.Router();

// home page :

const {
    costumer_index_get, 
    customer_view_get,
    costumer_edit_get
} = require("../controllers/allRoutesController");

router.get("/", costumer_index_get);

// View user info page : 

router.get("/view/:userId", customer_view_get);

// Edit user info page :

router.get("/edit/:userId", costumer_edit_get)

module.exports = router;