const jwt = require('jsonwebtoken');

module.exports = {
    serialize: function(req, res, next) {
        db.updateOrCreate(req.user, function(err, user) {
            if (err) { return next(err); }
            // we store the updated information in req.user again
            req.user = {
                id: user.id
            };
            next();
        });
    },
    generateToken: function(req, res, next) {
        req.token = jwt.sign({
            id: req.user.id,
        }, 'MY_SECRET', {
            expiresIn: "1h"
        });
        next();
    },
    respond: function(req, res) {
        res.status(200).json({
            user: req.user,
            token: req.token
        });
    }
}

const db = {
    updateOrCreate: function(user, cb) {
        // db dummy, we just cb the user
        cb(null, user);
    }
};