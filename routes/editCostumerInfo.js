const express = require("express");
const router = express.Router();
const Costumer = require("../models/costumer");

// Edit the user info :

const {
    costumer_put,
} = require("../controllers/editCostumerInfoController")

router.put("/edit/:costumerId", costumer_put);

// delete Costumer Info : 

router.delete("/edit/:costumerId", 
    async (req, res) => {
    const { costumerId } = req.params;
    try {
        await Costumer.findByIdAndDelete(costumerId);
        res.redirect("/");
    } catch (err) {
        console.log("error happened while trying to delete a costumer Id : ", err);
    }
})

module.exports = router;