const { ObjectId } = require("mongodb");
const Requested_Properties = require("../../models/RequestedProperties");


const requestPropertiesDelete = async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const result = await Requested_Properties.deleteOne(filter);
    res.send(result);
}

module.exports = requestPropertiesDelete