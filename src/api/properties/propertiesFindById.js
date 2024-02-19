const { ObjectId } = require("mongodb");
const Properties = require("../../models/Properties");

const propertiesFindById = async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await Properties.find(query).toArray();
    res.send(result);
}

module.exports = propertiesFindById 