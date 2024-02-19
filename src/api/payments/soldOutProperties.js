const Payments = require("../../models/Payments");

const soldOutProperties = async (req, res) => {
    const email = req.query.email;
    const query = { owner: email };
    console.log(query);
    const rentOutProperties = await Payments.find(query);
    // console.log(rentOutProperties);
    if (rentOutProperties) {
        const result = rentOutProperties.filter(
            (item) => item?.property_status == "Sold"
        );
        res.send(result);
    } else {
        return res.status(401).send({ message: "unauthorized access" });
    }
}

module.exports = soldOutProperties