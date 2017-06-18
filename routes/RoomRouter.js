var express = require('express');
var roomController = require('./../controller/RoomController');
var roomRouter = express.Router();

roomRouter.route('/').get(roomController.getRoom);
roomRouter.route('/').post(roomController.createRoom);
roomRouter.route('/:id').get(roomController.getRoomById);
roomRouter.route('/:id').post(roomController.createMessage);
module.exports = roomRouter;