// Dependencies
const express = require('express');
const userRouter = express.Router();
const { getUsers } = require('../controllers/userController');
const auth = require('../middleware/auth');

userRouter.get('/', auth, getUsers);

// exports
module.exports = userRouter;
