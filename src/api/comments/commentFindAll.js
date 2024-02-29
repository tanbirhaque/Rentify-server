const Comments = require("../../models/Comments");

const commentFindAll = async (req, res) => {
    const result = await Comments.find();
    res.send(result)
}

module.exports = commentFindAll