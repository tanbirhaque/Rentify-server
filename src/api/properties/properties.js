const Properties = require("../../models/Properties");

const propertiesFindAll = async (req, res) => {
    const result = await Properties.find();
    res.send(result);
};

module.exports = propertiesFindAll