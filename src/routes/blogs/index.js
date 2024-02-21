// this is api rout for blogs authentication
const blogsDelete = require('../../api/blogs/blogsDelete');
const blogsFindAll = require('../../api/blogs/blogsFindAll');
const blogsInsert = require('../../api/blogs/blogsInsert');
const router = require('express').Router();

router.post("/blogs", blogsInsert)
router.get("/blogs", blogsFindAll)
router.delete("/blogs/:id", blogsDelete)

module.exports = router;