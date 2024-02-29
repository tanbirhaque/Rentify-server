const { Schema, model } = require("mongoose");


const MessageSchema = new Schema(
    {
        chatId: {
            type: String
        },
        senderId: {
            type: String
        },
        text: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

const Message = model("messages", MessageSchema)
module.exports = Message


