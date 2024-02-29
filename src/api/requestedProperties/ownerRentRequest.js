const Requested_Properties = require("../../models/RequestedProperties");


const ownerRentRequest = async (req, res) => {
    const email = req.query.email;
    const query = { "property.owner_details.owner_email": email };
    const ownerProperties = await Requested_Properties.find(
        query
    );
    if (ownerProperties) {
        const result = ownerProperties.filter(
            (item) => item?.property?.property_for == "rent"
        );
        res.send(result);
    } else {
        return res.status(401).send({ message: "unauthorized access" });
    }
}

module.exports = ownerRentRequest