
var express = require('express');
var mysql = require('mysql');
var mongoose = require('mongoose');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var dateformat = require('dateformat');

//var userRouter = require('./routes/userRouter');

var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require("express-session");
var LocalStrategy   = require('passport-local').Strategy;
var flash    = require('connect-flash');
var configDB = require('./config/database.js');


/*
--------------------------
Connection with Mongooose
--------------------------
*/

mongoose.connect(configDB.url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
  
});

/*
--------------------------
Load Mongooose Schemas
--------------------------
*/

var Contact = require('./model/contact.js');

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
app.use(flash());

require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

require('./config/passport')(passport); // pass passport for configuration

/*
-------------------------
Passport
-------------------------
*/

/*passport.serializeUser(function(contact, done) {
      done(null, contact.id);
  });

  // used to deserialize the user
passport.deserializeUser(function(id, done) {
    Contact.findById(id, function(err, contact) {
        done(err, contact);
    });
});

passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) { // callback with email and password from our form

        console.log('entre al local');

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        Contact.findOne({ 'username' :  username }, function(err, contact) {
            // if there are any errors, return the error before anything else
            
            //console.log(contact);
            console.log(contact);
            //console.log(contact.validPassword(password,contact.password));
            console.log(err);
            
            if (err){

                console.log('entro al err');
                return done(err);
            }
            // if no user is found, return the message
            console.log('pase el de error')
            console.log(!contact);
            if (!contact)

                return done(null, false, req.flash('loginMessage', 'No contact found.')); // req.flash is the way to set flashdata using connect-flash
              
              
              // if the user is found but the password is wrong
              
            console.log(!(contact.password == password));  
            if (!(contact.password == password))
                
              return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));              
              // all is well, return successful user
              
            console.log('todo ok');
            return done(null, contact);
                  
            });

}));*/





/*
--------------------------
Post Methods
--------------------------
*/

app.post('/contactInsert',function(req, res){

  //var Contact = mongoose.model('Contact');
  var newContact = new Contact();
  
  newContact.name = req.body.name;
  newContact.dni = req.body.dni;
  newContact.tel = req.body.number;
  newContact.email = req.body.email;
  newContact.username = "1";
  newContact.password =  "1";

  console.log(newContact.dates);
  
  newContact.save(function (err, docs) {
    if (err) return console.error(err);
    res.json(docs);
  });

});

app.post('/login', passport.authenticate('local-login'/*, {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }*/),function(req,res){ 

      console.log(req.user);
      //console.log(res);
      res.json(req.user);

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

