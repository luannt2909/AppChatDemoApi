var express = require('express');
var userController = require('./../controller/UserController');
var userRouter = express.Router();

userRouter.route('/').get(userController.getUser);
userRouter.route('/').post(userController.createUser);
module.exports = userRouter;