
var express = require('express');
var mysql = require('mysql');
var mongoose = require('mongoose');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var dateformat = require('dateformat');

var userRouter = require('./routes/userRouter');

/*
-------------------------
Passport
-------------------------
*/
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require("express-session");
var LocalStrategy = require('passport-local');

/*
--------------------------
Connection with Mongooose
--------------------------
*/

mongoose.connect('mongodb://localhost/contacts');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
  
});

/*
--------------------------
Mongooose Schemas
--------------------------
*/

var contactSchema = mongoose.Schema({
    name: String,
    dni: String,
    tel: String,
    email: String,
    appointments:[Date]
});

var Contact = mongoose.model('Contact', contactSchema);

/*
--------------------------
Express
--------------------------
*/

var app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: 'secret'}));
app.use(passport.initialize());
app.use(passport.session());


/*
--------------------------
Post Methods
--------------------------
*/

app.post('/contactInsert',function(req, res){

  var Contact = mongoose.model('Contact');
  var newContact = new Contact();
  
  newContact.name = req.body.name;
  newContact.dni = req.body.dni;
  newContact.tel = req.body.number;
  newContact.email = req.body.email;

  console.log(newContact.dates);
  
  newContact.save(function (err, docs) {
    if (err) return console.error(err);
    res.json(docs);
  });

});

/*
------------------
Delete Methods    
------------------
*/

app.delete('/deleteAppointment/:index', function(req, res){

  console.log("En el delete del appointment")
  
  var paramInfo = req.params.index;
  var appointmentId = paramInfo[1];
  var contactId = paramInfo.substring(1);
  
  console.log(appointmentId);
  console.log(contactId);

  var appointmentList = req.body.appointments;
  console.log(req.body.appointments);

  Contact.update({'_id': contactId},{$unset: {"appoinments.arrayId": 1}},function(err, doc){

  });

  Contact.update({'_id': contactId},{$pull: {appointments: null}}, function(err,doc){
    res.json(doc);
  });

});

app.delete('/contactDelete/:id', function(req, res){
  
  console.log("Entre al delete del contacto");
  var id = req.params.id;
  //console.log(arrayId);
 
  Contact.remove({'_id': id}, function (err, doc){
        res.json(doc);
  })

});

/*
-----------------------
Get Methods
-----------------------
*/

app.get("/allContacts",function(req,res){
  
  console.log("Get full ContactList");
  Contact.find(function (err, docs) {
    if (err) return console.error(err);
    res.json(docs);
  })

});

app.get('/singleContact/:id', function(req, res){
  
  console.log("GET del detailed ");
  var id = req.params.id;
  console.log(id);
  //console.log(req.body.appointments);
  Contact.findOne({'_id': id}, function (err, docs) {
    if (err) return console.error(err);
    //console.log(docs);
    res.json(docs);
  })

});

app.get('/contactExists/:dni',function(req,res){
  
  console.log("entro al :DNI");
  var dni = req.params.dni;
  console.log(dni);
  
  Contact.find({ 'dni': dni }, function (err, docs) {
    res.json(docs);
  });
});

/*
---------------
Put Methods
---------------
*/

app.put('/contactEdit/:id', function(req, res){

  console.log("Put del edit user");

  var id = req.params.id;
  var now = new Date();
  var date = dateformat(now);
  
  Contact.update({'_id': id},{$set: {name: req.body.name, email:req.body.email, tel: req.body.number},$push:{appointments: date}}, function (err, docs){
    if (err) return console.error(err);
    res.json(docs);
  });
  
});

app.put('/addAppointment/:id', function(req, res){

  console.log("Put del addAppointment");
  var id = req.params.id;
  var date = dateformat(req.body.newAppointment);
  Contact.update({'_id': id},{$push:{appointments: date}}, function (err, docs){
    if (err) return console.error(err);
    console.log(docs);
    res.json(docs);
  });
});

app.listen(8080);
console.log("Server running on port 8080");

