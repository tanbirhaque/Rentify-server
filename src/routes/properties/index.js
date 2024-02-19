// this is api rout for properties authentication
const propertiesFindAll = require('../../api/properties/properties');
const propertiesFindById = require('../../api/properties/propertiesFindById');
const propertiesInsert = require('../../api/properties/propertiesInsert');
const router = require('express').Router();

router.post("/properties", propertiesInsert)
router.get("/properties", propertiesFindAll);
router.get("/properties/:id", propertiesFindById)

module.exports = router