const commentsReply = require('../../api/commentsReply/commentsReply');
const commentsReplyInsert = require('../../api/commentsReply/commentsReplyInsert');
const router = require('express').Router();

router.get("/commentsReply", commentsReply)
router.post("/commentsReply", commentsReplyInsert)


module.exports = router;