// Dependencies
const express = require('express');
const userRouter = express.Router();
const { getUsers } = require('../controllers/userController');

// user router
userRouter.get('/', getUsers);

// exports
module.exports = userRouter;
