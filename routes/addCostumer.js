const express = require("express");
const router = express.Router();

const {costumer_add_get, costumer_add_post} = require("../controllers/addCostumerController");

router.get("/user/add.html", costumer_add_get);

router.post("/user/add.html", costumer_add_post)

module.exports = router;