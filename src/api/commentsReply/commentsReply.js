const CommentsReplays = require("../../models/CommentsReply");

const commentsReply = async (req, res) => {
    const result = await CommentsReplays.find();
    res.send(result)
}

module.exports = commentsReply