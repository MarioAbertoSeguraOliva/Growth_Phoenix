const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
