const { model, Schema } = require("mongoose");


const BlogsSchema = new Schema({
    img: {
        type: String,
        default: ""
    },
    title: {
        type: String,
        default: ""
    },
    date: {
        type: String,
        default: ""
    },
    details: {
        type: String,
        default: ""
    },
    bloggerInfo: {
        bloggerName: {
            type: String,
            default: ""
        },
        bloggerEmail: {
            type: String,
            default: ""
        },
        bloggerImg: {
            type: String,
            default: ""
        }
    }
})

const Blogs = model("blogs", BlogsSchema);
module.exports = Blogs