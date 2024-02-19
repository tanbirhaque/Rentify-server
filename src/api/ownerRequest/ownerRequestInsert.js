const Owner = require("../../models/OwnerRequest");


const ownerRequestInsert = async (req, res) => {
    const owner = req.body;
    const owners = new Owner({
        ownerEmail: req.body.ownerEmail,
        ownerName: req.body.ownerName,
        ownerImage: req.body.ownerImage,
        ownerProfession: req.body.ownerProfession,
        status: req.body.status
    });
    const query = { ownerEmail: owner.ownerEmail }
    const ownerRequestExist = await Owner.findOne(query)
    console.log(ownerRequestExist)
    if (ownerRequestExist) {
        return res.send({ message: "existing already added", insertedId: null });
    }
    else {
        const result = await owners.save();
        return res.send(result);
    }
}

module.exports = ownerRequestInsert