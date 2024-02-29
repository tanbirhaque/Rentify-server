const Requested_Properties = require("../../models/RequestedProperties");

const requestedPropertiesFindAll = async (req, res) => {
    const result = await Requested_Properties.find();
    res.send(result);
}

module.exports = requestedPropertiesFindAll