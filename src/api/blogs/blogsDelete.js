const { ObjectId } = require("mongodb");
const Blogs = require("../../models/Blogs");

const blogsDelete = async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const result = await Blogs.deleteOne(filter);
    res.send(result);
  }

module.exports = blogsDelete