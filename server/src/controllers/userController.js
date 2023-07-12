// Dependencies
const userModel = require('../models/userModel');
const { successResponse } = require('../helper/responseController');
const { findWithId } = require('../services/findItem');
const { deleteImage } = require('../helper/deleteImage');
const createHttpError = require('http-errors');
const { createJSONWebToken } = require('../helper/jsonwebtoken');
const { jwtActivationKey, clientURL } = require('../secret');
const { sendEmailWithNodeMailer } = require('../helper/email');

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

    deleteImage(userImagePath);

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

// @description: get single user
// @route: POST - /api/user/:id
// @access: public
const processRegister = async (req, res, next) => {
  try {
    // fetch data form request body
    const { name, email, password, phone, address } = req.body;

    // user exist
    const userExist = await userModel.exists({ email });
    if (userExist) {
      throw createHttpError(409, 'User with this email already exist. Please Sign In');
    }

    // create jwt: temporary store user data in
    const token = await createJSONWebToken(
      { name, email, password, phone, address },
      jwtActivationKey,
      '10m'
    );

    // prepare email
    const emailData = {
      email,
      subject: 'Account Activation Email',
      html: `
        <h2>Hello, ${name} !</h2>
        <p>Please Click here to <a href='${clientURL}/api/users/activate/${token}' target='_blank'> Activate Your Account</a></p>
      `,
    };

    // send email with nodemailer
    try {
      await sendEmailWithNodeMailer(emailData);
    } catch (error) {
      next(createHttpError(500, 'Fail to send verification email '));
      return;
    }

    // Success Response
    return successResponse(res, {
      statusCode: 200,
      message: `Please go to your ${email} for completing your registration process`,
      payload: { token },
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
  processRegister,
};
