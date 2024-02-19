const SavedProperties = require("../../models/SavedProperties");

const savedPropertiesInsert = async (req, res) => {
    const savedProperties = new SavedProperties({
        property: req.body.property,
        savedUserEmail: req.body.savedUserEmail
    });
    const result = await savedProperties.save()
    res.send(result)
}

module.exports = savedPropertiesInsert;