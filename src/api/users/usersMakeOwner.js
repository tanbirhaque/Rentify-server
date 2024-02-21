// const { ObjectId } = require("mongodb");
const Users = require("../../models/Users");
const Owner = require("../../models/OwnerRequest");

const usersMakeOwner = async (req, res) => {
    const ownerEmail = req.body.email;
    const role = req.body.status;
    const filter = { email: ownerEmail };
    // const result = await ownerCollection.findOne(filter, statusChange);
    const roleChange = { $set: { role: role } };
    const result = await Users.updateOne(filter, roleChange);
    const filter1 = { ownerEmail: ownerEmail };
    const statusChange = {
        $set: { ownerStatus: role === "owner" ? true : false },
    };
    const result1 = await Owner.updateOne(filter1, statusChange);
    // res.send(result, result1);
    res
        .status(200)
        .json({ userUpdateResult: result, ownerUpdateResult: result1 });
}

module.exports = usersMakeOwner