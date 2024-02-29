const { model, Schema } = require("mongoose");

const ReviewsSchema = new Schema({
    propertyId: {
        type: String,
        default: ""
    },
    propertyTitle: {
        type: String,
        default: ""
    },
    reviewerEmail: {
        type: String,
        default: ""
    },
    reviewerName: {
        type: String,
        default: ""
    },
    reviewerImage: {
        type: String,
        default: ""
    },
    reviewText: {
        type: String,
        default: ""
    },
    reviewImage: {
        type: String,
        default: ""
    },
    reviewRating: {
        type: Number,
        default: null
    },
    date: {
        type: String,
        default: ""
    },
})

const Reviews = model("reviews", ReviewsSchema);
module.exports = Reviews