const Owner = require("../../models/OwnerRequest");


const ownerRequestInsert = async (req, res) => {
    const owner = req.body;
    const owners = new Owner({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        number: req.body.number,
        ownerEmail: req.body.ownerEmail,
        ownerImg: req.body.ownerImg,
        profession: req.body.profession,
        facebook: req.body.facebook,
        twitter: req.body.twitter,
        linkedin: req.body.linkedin,
        description: req.body.description,
        address: req.body.address,
        zipCode: req.body.zipCode,
        ownerStatus: req.body.ownerStatus
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