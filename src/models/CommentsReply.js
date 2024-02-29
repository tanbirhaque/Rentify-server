const { Schema, model } = require("mongoose") 

const CommentsReply = new Schema({
    commentId: {
        type: String,
        required: true
    },
    replierName: {
        type: String,
        default: ""
    },
    replierEmail: {
        type: String,
        default: ""
    },
    replierPhoto: {
        type: String,
        default: ""
    },
    message: {
        type: String,
        default: ""
    },
    date: {
        type: String,
        default: ""
    }

})

const CommentsReplays = model("blogsCommentsReply", CommentsReply, "blogsCommentsReply")
module.exports = CommentsReplays;