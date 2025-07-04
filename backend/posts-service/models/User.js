const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  profilePicture: String,
  // Add other fields if needed
});

module.exports = mongoose.model("User", userSchema);
