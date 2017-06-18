
var io = require('socket.io-client');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();

// Add a connect listener
var socketURL = 'http://10.0.135.76:3000/';
console.log(socketURL);
var options ={
  transports: ['websocket'],
  'force new connection': true
};

var client1 = io.connect(socketURL, options);
client1.emit('sendmessage', 6,7, 'Hi');
    client1.on('message', function(data){
        console.log(data);
    });
    
app.listen(4000);
module.exports=app;
// describe("Chat Server",function(){

// });