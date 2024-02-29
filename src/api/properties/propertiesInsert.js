const Properties = require("../../models/Properties");

const propertiesInsert = async (req, res) => {
    const properties = new Properties({
        property_info: req.body.property_info
    });
    const result = await properties.save()
    res.send(result)
}

module.exports = propertiesInsert