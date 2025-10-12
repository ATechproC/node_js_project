const express = require("express");
const router = express.Router();
const Costumer = require("../models/costumer");

// search page :

router.post("/search-costumer", (req, res) => {
    const { query } = req.body;
    res.redirect(`/search?query=${query.trim()}`);
})

router.get("/search", async (req, res) => {
    const { query } = req.query;
    try {
        const result = await Costumer.find({ $or: [{ firstName: query }, { lastName: query }] });
        res.render("user/search", { result });
    } catch (err) {
        console.log(err)
    }
})

router.delete("/search/:costumerId", async (req, res) => {
    const { costumerId } = req.params;
    try {
        await Costumer.findByIdAndDelete(costumerId);
        res.redirect("/");
    } catch (err) {
        console.log("error happened while trying to delete a costumer Id", err);
    }
});

module.exports = router;