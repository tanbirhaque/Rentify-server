const Blogs = require("../../models/Blogs");

const blogsInsert = async (req, res) => {
    const blogs = new Blogs({
        img: req.body.img,
        title: req.body.title,
        date: req.body.date,
        details: req.body.details,
        description: req.body.description,
        commodoviverra: req.body.commodoviverra,
        majorFacility: req.body.majorFacility,
        bloggerInfo: req.body.bloggerInfo
    });
    const result = await blogs.save()
    res.send(result)
}
module.exports = blogsInsert