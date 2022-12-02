const mongoose = require("mongoose");

const pollSchema = mongoose.Schema({
  title: String,
  options: [
    {
      name: String,
      url: String,
      votes: Number,
    },
  ],
  usersVoted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  endTime: Number,
});

module.exports.Poll = mongoose.model("Poll", pollSchema);
