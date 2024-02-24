const Chat = require("../models/Chat")

const createChat = async (req, res) => {
    const newChat = new Chat({
        members: [req.body.senderId, req.body.receiverId]
    })
    try {
        const result = await newChat.save()
        res.status(200).json(result)

    } catch (error) {
        res.status(500).json(error)
    }
}

const usersChat = async (req, res) => {
    try {
        const chat = await Chat.find({
            members: { $in: [req.params.userId] }
        })
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}

const findChat = async (req, res) => {
    try {
        const chat = await Chat.findOne({
            members: { $all: [req.params.firstId, req.params.secondId] }
        })
        console.log(chat)
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {createChat, usersChat, findChat}