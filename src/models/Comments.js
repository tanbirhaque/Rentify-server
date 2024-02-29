const { model, Schema } = require("mongoose");

const CommentsSchema = new Schema({
    name: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    img: {
        type: String,
        default: ""
    },
    subject: {
        type: String,
        default: ""
    },
    message: {
        type: String,
        default: ""
    },
    blogId: {
        type: String,
        default: ""
    },
    date: {
        type: String,
        default: ""
    },
})

const Comments = model("blogsComment", CommentsSchema, "blogsComment");
module.exports = Comments
