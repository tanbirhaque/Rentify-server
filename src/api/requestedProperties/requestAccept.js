const { ObjectId } = require("mongodb");
const Requested_Properties = require("../../models/RequestedProperties");


const requestAccept = async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const updateStatus = {
        $set: {
            requestStatus: "accepted",
        },
    };
    const result = await Requested_Properties.updateOne(
        query,
        updateStatus
    );
    res.send(result);
}

module.exports = requestAccept