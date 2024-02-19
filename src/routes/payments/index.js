// this is api rout for payments authentication
const paymentIntent = require('../../api/payments/paymentIntent');
const paymentInsert = require('../../api/payments/paymentsInsert');
const rentOutProperties = require('../../api/payments/rentOutProperties');
const soldOutProperties = require('../../api/payments/soldOutProperties');
const router = require('express').Router();

router.post("/create-payment-intent", paymentIntent)
router.post("/payments", paymentInsert)
router.get("/rentOut", rentOutProperties)
router.get("/soldOut", soldOutProperties)

module.exports = router