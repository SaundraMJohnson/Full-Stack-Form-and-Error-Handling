var jwt = require('jsonwebtoken');

// Verifying Token
exports.verifyToken = function(req, res, next) {
    let token = req.headers.authorization || "";
    if(token) {
        jwt.verify(token, 'You cant see me!', function(err, decoded) {
            if(err) return res.json({err});
            req.userId = decoded.userId;
            next();
        });
    } else {
        return res.json({msg: 'Admin not logged in'});
    }
}