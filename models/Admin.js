var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
    adminName: {
        type: String,
        required: true
    },
    email: {
        type: email,
        required: true,
        unique: true
    },
    password: {
        type: password,
        required: true,
        minlength: 6
    },
    profilePicture: {
        type: String,
        required: true
    }
});

// Hash password for users while registering.
adminSchema.pre('save', function(next) {
    if(this.password) {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    next();
});

// Hash password while comparing at the time of login.
adminSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;