const { model, Schema } = require("mongoose");

const OwnerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    ownerEmail: {
        type: String,
        required: true
    },
    ownerImg: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    facebook: {
        type: String,
        required: true
    },
    twitter: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    ownerStatus: {
        type: Boolean,
        required: true
    }
})


const Owner = model("ownerRequest", OwnerSchema, "ownerRequest");
module.exports = Owner