const SavedProperties = require("../../models/SavedProperties");


const savedPropertiesFind = async (req, res) => {
    try {
        const userEmail = req.query.email;
        const query = { savedUserEmail: userEmail }; // Update the field name to match 'savedUserEmail'
        const result = await SavedProperties.find(query);
        res.send(result);
    } catch (error) {
        console.error("Error retrieving properties:", error);
        res.status(500).send("Internal server error.");
    }
}

module.exports = savedPropertiesFind;