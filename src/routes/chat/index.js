const { createChat, usersChat, findChat } = require('../../Controllers/ChatController');

const router = require('express').Router();

router.post("/chat", createChat)
router.get("/chat/:userId", usersChat)
router.get("/chat/find/:firstId/:secondId", findChat)

module.exports = router