// Dependencies
const mongoose = require('mongoose');
const { mongodbURL } = require('../secret');

// MongoDB Connection
const connectDB = async (options = {}) => {
  try {
    // connect
    await mongoose.connect(mongodbURL, options);
    console.log(`Connect to MongoDB is Successfully`);
    // event
    mongoose.connection.on('error', (error) => {
      console.error('Database Connection Error!');
    });
  } catch (error) {
    console.error('Could Not Connect to MongoDB', error.toString());
  }
};

// exports
module.exports = connectDB;
