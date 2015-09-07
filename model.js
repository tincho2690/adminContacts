var mongoose = require('mongoose');

var contactSchema = mongoose.Schema({
    name: String,
    dni: String,
    tel: String,
    email: String,
    appointments:[Date]
});

module.exports = mongoose.model('Contact', contactSchema);