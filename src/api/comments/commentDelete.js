const { ObjectId } = require("mongodb");
const Comments = require("../../models/Comments");


const commentDelete = async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const result = await Comments.deleteOne(filter);
    res.send(result);
}

module.exports= commentDelete