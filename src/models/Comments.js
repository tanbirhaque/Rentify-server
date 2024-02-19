const { model, Schema } = require("mongoose");

const CommentsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    blogId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
})

const Comments = model("blogsComment", CommentsSchema, "blogsComment");
module.exports = Comments
