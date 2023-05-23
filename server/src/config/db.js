const mongoose = require('mongoose');
const { mongodbURL } = require('../secret');

const connectDB = async (options = {}) => {
  try {
    await mongoose.connect(mongodbURL, options);
    console.log(`Connect to MongoDB is Successfully`);
    mongoose.connection.on('error', (error) => {
      console.error('Database Connection Error!');
    });
  } catch (error) {
    console.error('Could Not Connect to MongoDB', error.toString());
  }
};

module.exports = connectDB;
