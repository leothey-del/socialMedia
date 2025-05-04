const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
   
  },
  email: {
    type: String,
    required: true,
   
  },
  password: { // Add this password field
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default: '' // Optional: URL to profile image
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);