const Reviews = require("../../models/Reviews");

const reviewsFindAll = async (req, res) => {
    const result = await Reviews.find();
    res.send(result);
}

module.exports = reviewsFindAll