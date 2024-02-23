const propertiesFindAll = require('../../api/properites/properitesFIndAll')
const propertiesInsertAll = require('../../api/properites/propertiesInsterAll')
var router = require('express').Router()

router.get("/properties", propertiesFindAll)
router.post("/properties", propertiesInsertAll)

module.exports = router