
const countries = require("../data/index");

const Costumer = require("../models/costumer");

const costumer_add_get = (req, res) => {
    res.render("user/add", { countries });
}

const costumer_add_post = async (req, res) => {
    try {
        const newCostumer = new Costumer(req.body);
        await newCostumer.save();
        res.redirect("/")
    } catch (err) {
        console.log("error happened while trying add a new costumer", err)
    }
}

module.exports = {costumer_add_get, costumer_add_post}