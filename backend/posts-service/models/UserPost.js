const mongoose = require("mongoose");
require("./User"); // Register User model for population

const userPostSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  media: { type: String },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const UserPost = mongoose.model("UserPost", userPostSchema);

module.exports = UserPost;
