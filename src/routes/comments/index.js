// this is api rout for comments authentication
const commentDelete = require('../../api/comments/commentDelete');
const commentFindAll = require('../../api/comments/commentFindAll');
const commentInsert = require('../../api/comments/commentInsert');
const router = require('express').Router();

router.post("/comments", commentInsert)
router.get("/comments", commentFindAll)
router.delete("/comments/:id", commentDelete)

module.exports = router

