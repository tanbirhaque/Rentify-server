const Blogs = require("../../models/Blogs");


const blogsFindAll = async (req, res) => {
    const result = await Blogs.find();
    res.send(result);
}

module.exports = blogsFindAll