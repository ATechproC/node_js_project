const countries = require("../data");
const Costumer = require("../models/costumer");

// Moment library : 

const moment = require("moment");

const costumer_index_get = async (req, res) => {
    try {
        const costumers = await Costumer.find();
        res.render("index", { costumers, moment })
    } catch (err) {
        console.log("error happened while trying to fetch costumers data :", err)
    }
}

const customer_view_get = async (req, res) => {
    const { userId } = req.params;
    try {
        const customersDetails = await Costumer.findById(userId);
        res.render("user/view", { customersDetails, moment });
    } catch (err) {
        console.log("error happened while trying to get " + userId + " " + err)
    }
}

const costumer_edit_get = async (req, res) => {
    const { userId } = req.params;
    try {
        const customersDetails = await Costumer.findById(userId);
        res.render("user/edit", { customersDetails, countries });
    } catch (err) {
        console.log("error happened while trying to get " + userId + " " + err)
    }
}

module.exports = {
    costumer_index_get, 
    customer_view_get,
    costumer_edit_get
}