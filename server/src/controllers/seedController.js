const data = require('../data');
const userModel = require('../models/userModel');

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

module.exports = seedUser;
