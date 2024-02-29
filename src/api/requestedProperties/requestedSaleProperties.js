const Requested_Properties = require("../../models/RequestedProperties");


const requestedSaleProperties = async (req, res) => {
    const email = req.query.email;
    const query = { requesterEmail: email };
    const requested_Properties = await Requested_Properties.find(
        query
    );
    if (requested_Properties) {
        const result = requested_Properties.filter(
            (item) => item?.property?.property_for == "sale"
        );
        res.send(result);
    } else {
        return res.status(401).send({ message: "unauthorized access" });
    }
}

module.exports = requestedSaleProperties;