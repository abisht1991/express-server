const express = require('express');
const bodyParser= require('body-parser')
const app = express();
let uniqueID = 0;
let users = [];
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.listen(3000, function() {
  console.log('listening on 3000');
});
app.get('/', function(req, res) {
  res.send("Yep it's working");
});
app.post('/users', (req, res, next) => {
    let user = {
      firstName: req.body.user.firstName,
      lastName: req.body.user.lastName
    };
    user.id = uniqueID++;
    users.push(user);
    res.send({user:user});
    // dbase.collection("name").save(name, (err, result) => {
    //   if(err) {
    //     console.log(err);
    //   }
    //
    //   res.send('name added successfully');
    // });
});
app.get('/users', (req, res) => {
    console.log('yipuieee get');
    res.send({user:users});
    // dbase.collection('name').find().toArray( (err, results) => {
    //   res.send(results)
    // });
});
app.get('/users/:id', (req, res, next) => {
    // if(err) {
    //   throw err;
    // }

    let id = req.params.id;
    let userIndex = users.findIndex((data)=>{
       return data.id=== parseInt(id);
    });
    if(userIndex>-1){
      res.send({user:users[userIndex]});
    }else{
      res.send('user doesnt exists');
    }
    // dbase.collection('name').find(id).toArray( (err, result) => {
    //   if(err) {
    //     throw err;
    //   }
    //
    //   res.send(result);
    // });
 });
 app.put('/users/:id', (req, res, next) => {
    let id = req.params.id;
    let userIndex = users.findIndex((data)=>{
      return data.id===parseInt(id);
    });
    if(userIndex>-1){
      users[userIndex].firstName = req.body.user.firstName;
      users[userIndex].lastName =req.body.user.lastName;
      res.send({user:users[userIndex]});
    }else{
      res.send('user doesnt exists');
    }
    // dbase.collection("name").update({_id: id}, {$set:{'firstName': req.body.firstName, 'lastName': req.body.lastName}}, (err, result) => {
    //   if(err) {
    //     throw err;
    //   }
    //   res.send('user updated sucessfully');
    // });
});
app.delete('/users/:id', (req, res, next) => {
    let id = req.params.id;
    let userIndex = users.findIndex((data)=>{
      return data.id=== parseInt(id);
    });
    if(userIndex>-1){
      users.splice(userIndex,1);
      res.send({});
    }else{
      res.send('user doesnt exists');
    }
    // dbase.collection('name').deleteOne(id, (err, result) => {
    //   if(err) {
    //     throw err;
    //   }
    //
    //   res.send('user deleted');
    // });
 });
