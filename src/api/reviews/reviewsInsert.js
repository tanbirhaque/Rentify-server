const Reviews = require("../../models/Reviews");

const reviewsInsert = async (req, res) => {
    const reviews = new Reviews({
        propertyId: req.body.propertyId,
        propertyTitle: req.body.propertyTitle,
        reviewerEmail: req.body.reviewerEmail,
        reviewerName: req.body.reviewerName,
        reviewerImage: req.body.reviewerImage,
        reviewText: req.body.reviewText,
        reviewImage: req.body.reviewImage,
        reviewRating: req.body.reviewRating,
        date: req.body.date,
    });
    const result = await reviews.save();
    res.send(result)
}

module.exports = reviewsInsert