// this is api rout for properties authentication
const propertiesFindAll = require('../../api/properties/properties');
const propertiesFind = require('../../api/properties/propertiesFind');
const propertiesFindById = require('../../api/properties/propertiesFindById');
const propertiesInsert = require('../../api/properties/propertiesInsert');
const propertyVerification = require('../../api/properties/propertyVerification');
const router = require('express').Router();

router.post("/properties", propertiesInsert)
router.get("/properties", propertiesFindAll);
router.get("/recentAddProperties", propertiesFind)
router.get("/properties/:id", propertiesFindById)
router.patch("/verification", propertyVerification)

module.exports = router