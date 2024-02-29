const { ObjectId } = require("mongodb");
const Requested_Properties = require("../../models/requestedProperties");


const requestReject = async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const updateStatus = {
        $set: {
            requestStatus: "rejected",
        },
    };
    const result = await Requested_Properties.updateOne(
        query,
        updateStatus
    );
    res.send(result);
}

module.exports = requestReject;