const Properties = require("../../models/Properties");

const propertiesFind = async (req, res) => {
    const email = req.query.email;
    const query = { "property_info.owner_details.owner_email": email };
    const ownerProperties = await Properties.find(query);
    res.send(ownerProperties);
}

module.exports = propertiesFind