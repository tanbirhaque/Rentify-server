const { Schema, model } = require("mongoose");


const ChatSchema = new Schema(
    {
        members: {
            type: Array
        }
    },
    {
        timestamps: true
    }
)

const Chat = model("chats", ChatSchema)
module.exports = Chat