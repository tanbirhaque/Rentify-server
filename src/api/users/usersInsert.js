const Users = require("../../models/Users");


const userInsert = async (req, res) => {
    const userInfo = req.body;
    const user = new Users({
        name: req.body.name,
        email: req.body.email,
        image: req.body.image,
        role: req.body.role
    });
    const query = { email: userInfo.email }
    const existingUser = await Users.findOne(query)
    if (existingUser) {
        return res.send({ message: "existing already added", insertedId: null })
    }
    const result = await user.save()
    res.send(result)
}


module.exports = userInsert