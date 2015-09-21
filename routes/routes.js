module.exports = function(app, passport) {

var Contact = require('../model/contact.js');

app.get("/allContacts",function(req,res){
  
  console.log("Get full ContactList");
  Contact.find(function (err, docs) {
    if (err) return console.error(err);
    res.json(docs);
  })

});
};