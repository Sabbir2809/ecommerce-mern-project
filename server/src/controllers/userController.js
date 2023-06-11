const createError = require('http-errors');
const userModel = require('../models/userModel');

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || '';
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const searchRegExp = new RegExp('.*' + search + '.*', 'i');

    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    };

    const options = { password: 0 };

    const users = await userModel
      .find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await userModel.find(filter).countDocuments();

    if (!users) throw createError(404, 'No Users Found!');

    res.status(200).json({
      message: 'User Information',
      users,
      pagination: {
        totalPage: Math.ceil(count / limit),
        currentPage: page,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers };
