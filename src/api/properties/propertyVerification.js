const { ObjectId } = require("mongodb");
const Properties = require("../../models/Properties");

const propertyVerification = async (req, res) => {
    const id = req.body.id;
    const query = { _id: new ObjectId(id) };
    const status = req.body.propertyStatus;
    const statusChange = {
        $set: {
            "property_info.verify_status": status,
        },
    };
    const result = await Properties.updateOne(query, statusChange);
    res.send(result);
}

module.exports = propertyVerification