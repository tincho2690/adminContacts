
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var contactSchema = mongoose.Schema({
    
    username: String,
    password: String,
    name: String,
    dni: String,
    tel: String,
    email: String,
    appointments:[Date]

});

// methods ======================
// generating a hashed password
/*contactSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
contactSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};
*/
module.exports = mongoose.model('Contact', contactSchema);