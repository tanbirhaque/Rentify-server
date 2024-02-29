const Requested_Properties = require("../../models/RequestedProperties");

const requestedPropertiesFind = async (req, res) => {
    const email = req.query.email;
    const query = { requesterEmail: email };
    const result = await Requested_Properties.find(query)
    res.send(result);
}

module.exports = requestedPropertiesFind