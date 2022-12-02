const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userName: String,
    password: String,
    admin: Boolean,
    token: String
})

module.exports.User = mongoose.model("User", userSchema)
