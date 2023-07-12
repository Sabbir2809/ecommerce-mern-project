// Dependencies
const data = require('../data');
const userModel = require('../models/userModel');

// seed user
const seedUser = async (req, res, next) => {
  try {
    // deleting all existing users
    await userModel.deleteMany({});
    // inserting new users
    const users = await userModel.insertMany(data.users);
    // successful response
    return res.status(201).json(users);
  } catch (error) {
    next(error);
  }
};

// export
module.exports = seedUser;
