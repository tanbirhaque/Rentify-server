// this is api rout for comments authentication
const reviewDelete = require('../../api/reviews/reviewDelete');
const reviewsFindAll = require('../../api/reviews/reviewsFIndAll');
const reviewsInsert = require('../../api/reviews/reviewsInsert');
const router = require('express').Router();

router.post("/reviews", reviewsInsert)
router.get("/reviews", reviewsFindAll)
router.delete("/reviews/:id", reviewDelete)

module.exports = router