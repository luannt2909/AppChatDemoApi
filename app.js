var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var driver = require('./connection');

var userRouter = require('./routes/UserRouter');
var roomRouter = require('./routes/RoomRouter');
var session=driver.session();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/user',userRouter);
app.use('/chatroom',roomRouter);

app.get('/', function(req,res){
    res.send('Hello, Wellcome to Chat App !');
})

io.on('connection', function (socket) {
         console.log("Connection");
            socket.on('sendmessage', function (userId, roomId, message) {         
                session.run('match (n:User)-[r:CHAT_IN]->(p:ChatRoom) where n.id =$userId and  p.id= $id set r.message =$message'
                    +', r.time= tofloat(timestamp()) return r',
                    {id: roomId, userId: userId, message: message})
                .then(result=>{
                    socket.emit('message', result.records[0]._fields[0].properties.message);
                    driver.close();
                })
                .catch(err=>{
                    console.log(err);
                    socket.emit('message', err.message);
                });
            });
});


//app.listen(3000);
console.log('Server Started on Port 3000');
http.listen(3000, function(){
  console.log('listening on *:3000');
});
module.exports = app;