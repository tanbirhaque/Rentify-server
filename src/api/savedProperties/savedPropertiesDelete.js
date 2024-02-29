const { ObjectId } = require("mongodb");
const SavedProperties = require("../../models/SavedProperties");

const savedPropertiesDelete = async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const result = await SavedProperties.deleteOne(filter);
    res.send(result);
}

module.exports = savedPropertiesDelete