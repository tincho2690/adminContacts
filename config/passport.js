// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

var Contact = require('../model/contact.js');


module.exports = function(passport) {

	passport.serializeUser(function(contact, done) {
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

	}));
};