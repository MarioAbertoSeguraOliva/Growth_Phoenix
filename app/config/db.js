require('dotenv').config();
const mongoose = require('mongoose');
const dbURI = process.env.MONGODB_URI || 'mongodb://mongo:27017/test';

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
