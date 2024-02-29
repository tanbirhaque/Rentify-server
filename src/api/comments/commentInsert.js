// this is comments data insert function
const Comments = require("../../models/Comments");

const commentInsert = async (req, res) => {
    const comments = new Comments({
        name: req.body.name,
        email: req.body.email,
        img: req.body.img,
        subject: req.body.subject,
        message: req.body.message,
        blogId: req.body.blogId,
        date: req.body.date,
    });
    const result = await comments.save();
    res.send(result)
}

module.exports = commentInsert