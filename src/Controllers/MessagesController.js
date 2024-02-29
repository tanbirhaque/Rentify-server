const Message = require("../models/Message");


const messageInsert = async (req, res) => {
    const { chatId, senderId, text } = req.body;
    const newMessage = new Message({
        chatId,
        senderId,
        text
    })
    try {
        const result = await newMessage.save()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

const messageFind = async (req, res) => {
    const { chatId } = req.params;
    try {
        const result = await Message.find({ chatId })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { messageInsert, messageFind }