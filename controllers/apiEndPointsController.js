const User = require("../models/user");

const user_post = async (req, res) => {

    const { userName } = req.body;

    const newUser = new User();
    newUser.userName = userName;
    await newUser.save();

    res.redirect("/");
}

const user_id_delete = async (req, res) => {

    const { userId } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        res.json(deletedUser);

    } catch (err) {
        console.log("error happened while trying deleted the user with Id ", userId, err)
    }
}

const user_all_get = async (req, res) => {
    try {
        const allUsers = await User.find();
        res.json(allUsers)
    } catch (err) {
        console.log("error happened while trying fetching all users : ", err)
    }
}

const user_id_get =  async (req, res) => {

    const { userId } = req.params;

    try {
        const user = await User.findById(userId)
        res.json(user);
    } catch (err) {
        console.log("error while fetching the user with id ", userId, " : ", err)
    }
}

const users_get =  async (req, res) => {
    try {
        const allUsers = await User.find();
        res.render("show-users", { title: "Users", data: allUsers })
    } catch (err) {
        console.log("error happened while trying showing all users : ", err)
    }
}

module.exports = {
    user_post,
    user_id_delete,
    user_all_get,
    user_id_get,
    users_get
}