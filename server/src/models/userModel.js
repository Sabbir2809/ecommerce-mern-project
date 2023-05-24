const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const { defaultImagePath } = require('../secret');

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'User Name is Required'],
      maxLength: [31, 'The length of user name can be maximum 31 characters'],
      minLength: [31, 'The length of user name can be maximum 31 characters'],
    },

    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: [true, 'User Email Address is Required'],
      validate: {
        validator: (v) => {
          return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        },
        message: 'Please enter a valid email address',
      },
    },

    password: {
      type: String,
      required: [true, 'User Password is Required'],
      minLength: [6, 'The length of user password can be minimum 6 characters'],
      set: (v) => {
        bcrypt.hashSync(v, bcrypt.genSaltSync(10));
      },
    },

    image: {
      type: String,
      default: defaultImagePath,
    },

    address: {
      type: String,
      required: [true, 'User Address is Required'],
    },

    phone: {
      type: String,
      required: [true, 'User Phone is Required'],
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = model('Users', userSchema);

module.exports = userModel;
