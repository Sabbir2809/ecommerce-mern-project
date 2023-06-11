// Dependencies
const fs = require('fs');
const userModel = require('../models/userModel');
const { successResponse } = require('../helper/responseController');
const { findWithId } = require('../services/findItem');

// @description: get all users
// @route: GET - /api/users
// @access: public
const getUsers = async (req, res, next) => {
  try {
    // searching & pagination
    const search = req.query.search || '';
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    // searching regular expression
    const searchRegExp = new RegExp('.*' + search + '.*', 'i');

    // search filter
    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    };
    // projection
    const options = { password: 0 };

    // find user
    const users = await userModel
      .find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit);

    // total users in DB
    const count = await userModel.find(filter).countDocuments();

    // check user not found
    if (!users) throw createError(404, 'No Users Found!');

    return successResponse(res, {
      statusCode: 200,
      message: 'Users were returned successfully',
      payload: {
        users,
        pagination: {
          totalPage: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// @description: get single user
// @route: GET - /api/user/:id
// @access: public
const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id; // params id
    const options = { password: 0 }; // projection
    const user = await findWithId(userModel, id, options); // find user in DB
    // Success Response
    return successResponse(res, {
      statusCode: 200,
      message: 'Users was returned successfully',
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

// @description: get single user
// @route: GET - /api/user/:id
// @access: public
const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id; // params id
    const options = { password: 0 }; // projection
    const user = await findWithId(userModel, id, options); // find user in DB

    const userImagePath = user.image;
    fs.access(userImagePath, (err) => {
      if (err) {
        console.error('User image does not exist');
      } else {
        fs.unlink(userImagePath, (err) => {
          if (err) throw err;
          console.log('User image was deleted');
        });
      }
    });

    await userModel.findByIdAndDelete({
      _id: id,
      isAdmin: false,
    });

    // Success Response
    return successResponse(res, {
      statusCode: 200,
      message: 'Users was delete successfully',
    });
  } catch (error) {
    next(error);
  }
};

// exports
module.exports = {
  getUsers,
  getUserById,
  deleteUserById,
};
