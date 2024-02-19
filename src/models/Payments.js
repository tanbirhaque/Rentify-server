const { model, Schema } = require("mongoose");

const PaymentsSchema = new Schema({
    paymentUser: {
        type: String,
        default: ""
    },
    propertyId: {
        type: String,
        default: ""
    },
    requestId: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        default: null
    },
    owner: {
        type: String,
        default: ""
    },
    property_img: {
        type: String,
        default: ""
    },
    property_title: {
        type: String,
        default: ""
    },
    property_location: {
        type: Object,
        // This object is not required for development purposes by Tanbir
        // default: ""
    },
    property_category: {
        type: String,
        default: ""
    },
    property_status: {
        type: String,
        default: ""
    },
    date: {
        type: String,
        default: ""
    },
    transactionId: {
        type: String,
        default: ""
    },
})

const Payments = model("payments", PaymentsSchema);
module.exports = Payments