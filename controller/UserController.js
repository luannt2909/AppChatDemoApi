
var driver = require('./../connection');
var Response = require('./../models/Response');
var Error = require('./../models/Error');

var session = driver.session();

exports.getUser = function(req,res){
    session.run('MATCH (n:User) RETURN n')
            .then(function(result){
            var data=[];
            result.records.forEach(function(element) {
                data.push(element._fields[0].properties);
            });
            var result = new Response(data,200,"");
            res.json(result);
            driver.close(); 
        })
        .catch(function(err){
            console.log(err);
            var error = new Error(err.code, err.message);
            res.json(error);
        });
       
};

//Create a new user
exports.createUser = function(req,res){
    var user=req.body;
    console.log(user);
  
    session.run('CREATE (n:User $props) SET n.id = tofloat(ID(n)), n.create_time=tofloat(timestamp()) RETURN n',
                {props: user})
            .then(function(result){
            var data = result.records[0]._fields[0].properties;
            var result = new Response(data,200,"Create Sucessfull");
            res.json(result);
            driver.close();
        })
        .catch(function(err){
            console.log(err);
            var error = new Error(err.code, err.message);
            res.json(error);
        });
};



