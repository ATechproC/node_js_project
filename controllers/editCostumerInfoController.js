const Costumer = require("../models/costumer");

const costumer_put =     (req, res) => {
    Costumer.updateOne({ _id: req.params.costumerId }, req.body)
        .then(() => {
            res.redirect("/");
        });
}

module.exports = {
    costumer_put,
}