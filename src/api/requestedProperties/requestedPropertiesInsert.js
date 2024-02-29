const Requested_Properties = require("../../models/RequestedProperties");

const requestedPropertiesInsert = async (req, res) => {
    const requested_Properties = new Requested_Properties({
        property: req.body.property,
        propertyID: req.body.propertyID,
        requestStatus: req.body.requestStatus,
        requesterName: req.body.requesterName,
        requesterNumber: req.body.requesterNumber,
        requesterEmail: req.body.requesterEmail,
        requesterPhoto: req.body.requesterPhoto,
        requesterMessage: req.body.requesterMessage,
        family: req.body.family,
        children: req.body.children
    });
    const result = await requested_Properties.save()
    res.send(result)
}

module.exports = requestedPropertiesInsert