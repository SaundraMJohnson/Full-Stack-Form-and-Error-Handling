var express = require('express');
var Admin = require('../../models/Admin');
var jwt = require('jsonwebtoken');
var authToken = require('../../modules/verifyToken');
var router = express.Router();

// Registration: /api/admin
router.post('/', (req, res, next) => {
    var email = req.body.email;
    var adminName = req.body.adminName;
    var pass = req.body.password;
    if(!email || !adminName || !pass) return res.json({success: false, msg: 'Please fill in all fields'});
    Admin.findOne({email}, (err, admin) => {
        if(err) return res.json(err);
        if(admin) return res.json({success: false, msg: 'Email is already registered, please Login'});
        req.body.profilePicture = "https://static.productionready.io/images/smiley-cyrus.jpg";
        Admin.create(req.body, (err, newAdmin) => {
            if(err) return res.json({success: false, err});
            return res.json({newAdmin, success: true});
        });
    })
});

// Login: /api/admin/login
router.post('/login', (req, res, next) => {
    var email = req.body.email;
    var pass = req.body.password;
    // Find Admin in database.
    if(!email || !pass) return res.json({success: false, msg: 'Please fill in all fields'});
    Admin.findOne({email}, (err, admin) => {
        if(err) return res.json({success: false, err});
        if(!admin) return res.json({success: false, msg: "Admin not registered, please register"});
        if(!admin.validatePassword(pass)) return res.json({success: false, msg: "Invalid password"});
        // Generate token for user.
        var token = jwt.sign({adminId: admin._id}, 'You cant see me!');
        return res.json({success: true, admin, token, msg: 'Successful Login'});
    });
});

module.exports = router;