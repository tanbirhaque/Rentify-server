const Users = require("../../models/Users");

const usersFind = async (req, res) => {
    const email = req.params.email;
    const user = await Users.findOne({ email });
    res.send(user);
}

module.exports = usersFind