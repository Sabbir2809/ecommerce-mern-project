// Dependencies
const express = require('express');
const userRouter = express.Router();
const { getUsers, getUserById, deleteUserById } = require('../controllers/userController');

// user router
userRouter.get('/users', getUsers);
userRouter.get('/users/:id', getUserById);
userRouter.delete('/users/:id', deleteUserById);

// exports
module.exports = userRouter;
