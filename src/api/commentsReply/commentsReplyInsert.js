const CommentsReplays = require("../../models/CommentsReply");

const commentsReplyInsert = async (req, res) => {
    const replays = new CommentsReplays({
        commentId: req.body.commentId,
        replierName: req.body.replierName,
        replierEmail: req.body.replierEmail,
        replierPhoto: req.body.replierPhoto,
        message: req.body.message,
        date: req.body.date
    });
    const result = await replays.save()
    res.send(result)
}

module.exports = commentsReplyInsert