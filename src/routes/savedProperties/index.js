// this is api rout for savedProperties authentication
const savedPropertiesInsert = require('../../api/savedProperties/savedProperties');
const savedPropertiesDelete = require('../../api/savedProperties/savedPropertiesDelete');
const savedPropertiesFind = require('../../api/savedProperties/savedPropertiesFind');
const router = require('express').Router();

router.get("/saved-properties", savedPropertiesFind)
router.post("/saved-properties", savedPropertiesInsert)
router.delete("/saved-properties/:id", savedPropertiesDelete)

module.exports = router