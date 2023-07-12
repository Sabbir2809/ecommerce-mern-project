// Dependencies
const express = require('express');
const userRouter = express.Router();
const { getUsers, getUserById, deleteUserById, processRegister } = require('../controllers/userController');

// users router
userRouter.post('/users/process-register', processRegister);
userRouter.get('/users', getUsers);
userRouter.get('/users/:id', getUserById);
userRouter.delete('/users/:id', deleteUserById);

// exports
module.exports = userRouter;
