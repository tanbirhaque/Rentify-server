const { ObjectId } = require("mongodb");
const Users = require("../../models/Users");


const usersFindById = async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await Users.findOne(query);
    res.send(result);
}

module.exports = usersFindById