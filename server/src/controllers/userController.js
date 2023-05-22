const users = require('./../models/userModel');

const getUsers = (req, res, next) => {
  try {
    res.status(200).json({ message: 'User Information', users });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers };
