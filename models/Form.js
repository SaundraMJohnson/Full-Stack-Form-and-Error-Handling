var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var formSchema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    }
});

var Form = mongoose.model('Form', formSchema);
module.exports = Form;