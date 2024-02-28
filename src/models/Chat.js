const { Schema, model } = require("mongoose");


const ChatSchema = new Schema(
    {
        members: [],
        emails: []
    },
    {
        timestamps: true
    }
)

const Chat = model("chats", ChatSchema)
module.exports = Chat