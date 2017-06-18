var driver = require('./../connection');
var Response = require('./../models/Response');
var Error = require('./../models/Error');

var session = driver.session();

exports.getRoom = function(req,res){
    
    session.run('MATCH (n:ChatRoom) RETURN  n')
            .then(result=>{
            var data=[];
            result.records.forEach(element=> {
                data.push(element._fields[0].properties);
            });
            var response = new Response(data,200,"");
            res.json(response);
            driver.close(); 
            })
            .catch(err=>{
                console.log(err);
                var error = new Error(err.code, err.message);
                res.json(error);
            });
       
};

exports.createRoom = function(req,res){
    var params = req.body;
    console.log(params);
  
    session.run('CREATE (n:ChatRoom $props) SET n.id = tofloat(ID(n)), n.create_time=tofloat(timestamp()) RETURN n',
                {props: params})
            .then(result=>{
            var data = result.records[0]._fields[0].properties;
            var result = new Response(data,200,"Create Sucessfull");
            res.json(result);
            driver.close();
        })
        .catch(err=>{
            console.log(err);
            var error = new Error(err.code, err.message);
            res.json(error);
        });
};


//Add message
exports.createMessage = function(req,res){
    const userId = parseInt(req.body.userId);
    const message = req.body.message.toString();
    const roomId = parseInt(req.params.id);
    console.log(userId);
    console.log(roomId);
    session.run('match (n:User)-[r:CHAT_IN]->(p:ChatRoom) where n.id =$userId and  p.id= $id set r.message =$message'
                +', r.time= tofloat(timestamp()) return r',
                {id: roomId, userId: userId, message: message})
            .then(result=>{
                var data = result.records[0]._fields[0].properties;
                var result = new Response(data,200,"Create Successfull");
                res.json(result);
                driver.close();
            })
            .catch(err=>{
            console.log(err);
            var error = new Error(err.code, err.message);
            res.json(error);
        });
            
};

exports.getRoomById = function(req,res){
        var id = parseInt(req.params.id);
        console.log(id);
        session.run('MATCH (n:ChatRoom) WHERE ID(n)=$id RETURN  n',{id: id})
            .then(result=>{
            var data= result.records[0]._fields[0].properties;
            var response = new Response(data,200,"");
            res.json(response);
            driver.close(); 
            })
            .catch(err=>{
                console.log(err);
                var error = new Error(err.code, err.message);
                res.json(error);
            });
};