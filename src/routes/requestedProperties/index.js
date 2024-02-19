// this is api rout for requestedProperties authentication
const ownerRentRequest = require('../../api/requestedProperties/ownerRentRequest');
const ownerSaleRequest = require('../../api/requestedProperties/ownerSaleRequest');
const requestAccept = require('../../api/requestedProperties/requestAccept');
const requestedPropertiesFind = require('../../api/requestedProperties/requestedPropertiesFind');
const requestedPropertiesFindAll = require('../../api/requestedProperties/requestedPropertiesFindAll');
const requestedPropertiesInsert = require('../../api/requestedProperties/requestedPropertiesInsert');
const requestReject = require('../../api/requestedProperties/requestReject');
const requestedRentProperties = require('../../api/requestedProperties/requestedRentProperties');
const requestedSaleProperties = require('../../api/requestedProperties/requestedSaleProperties');
const router = require('express').Router();

router.post("/requested-properties", requestedPropertiesInsert)
router.put("/accept/:id", requestAccept)
router.put("/reject/:id", requestReject)
router.get("/requested-properties", requestedPropertiesFindAll)
router.get("/all_requested", requestedPropertiesFind)
router.get("/ownerRentReq", ownerRentRequest)
router.get("/ownerSaleReq", ownerSaleRequest)
router.get("/requested-sale", requestedSaleProperties)
router.get("/requested-rent", requestedRentProperties)

module.exports = router;