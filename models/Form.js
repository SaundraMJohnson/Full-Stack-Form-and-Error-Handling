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

// Hash password for users while registering.
formSchema.pre('save', function(next) {
    if(this.password) {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    next();
});

// Hash password while comparing at the time of login.
formSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var Form = mongoose.model('Form', formSchema);
module.exports = Form;