// this is api rout for payments authentication
const ownerRequestInsert = require('../../api/ownerRequest/ownerRequestInsert');
const ownerRequestedFind = require('../../api/ownerRequest/ownerRequestedFind');
const ownerRequestedFindAll = require('../../api/ownerRequest/ownerRequestedFindAll');
const router = require('express').Router();

router.post("/ownerRequest", ownerRequestInsert)
router.get("/ownerRequest", ownerRequestedFindAll)
router.get("/ownerRequest/:email", ownerRequestedFind)

module.exports = router