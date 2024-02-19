const { ObjectId } = require("mongodb");
const Users = require("../../models/Users");

const usersMakeOwner = async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const roleChange = {
        $set: {
            role: "Owner",
        },
    };
    const result = await Users.updateOne(filter, roleChange);
    res.send(result);
}

module.exports = usersMakeOwner