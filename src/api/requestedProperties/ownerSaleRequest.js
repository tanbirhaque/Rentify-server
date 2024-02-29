const Requested_Properties = require("../../models/RequestedProperties");


const ownerSaleRequest = async (req, res) => {
    const email = req.query.email;
    const query = { "property.owner_details.owner_email": email };
    const ownerSaleProperties = await Requested_Properties.find(
        query
    );
    if (ownerSaleProperties) {
        const result = ownerSaleProperties.filter(
            (item) => item?.property?.property_for == "sale"
        );
        res.send(result);
    } else {
        return res.status(401).send({ message: "unauthorized access" });
    }
}

module.exports = ownerSaleRequest; 