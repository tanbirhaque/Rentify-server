const Owner = require("../../models/OwnerRequest");

const ownerRequestedFindAll = async (req, res) => {
    const result = await Owner.find();
    res.send(result);
}
module.exports = ownerRequestedFindAll