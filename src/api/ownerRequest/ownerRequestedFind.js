const Owner = require("../../models/OwnerRequest");

const ownerRequestedFind = async (req, res) => {
    const email = req.params.email;
    const user = await Owner.findOne({ ownerEmail: email });
    res.send(user);
}

module.exports = ownerRequestedFind;