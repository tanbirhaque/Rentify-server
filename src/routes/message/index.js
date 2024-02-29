const { messageInsert, messageFind } = require('../../Controllers/MessagesController');
const router = require('express').Router();

router.post("/message", messageInsert)
router.get("/message/:chatId", messageFind)

module.exports = router