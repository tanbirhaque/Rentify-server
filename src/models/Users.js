const { model, Schema } = require("mongoose");


const UsersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
})


const Users = model("users", UsersSchema);
module.exports = Users