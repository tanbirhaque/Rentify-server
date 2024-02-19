const Users = require("../../models/Users");

const usersFindALl = async (req, res) => {
    const result = await Users.find();
    res.send(result);
}

module.exports = usersFindALl 