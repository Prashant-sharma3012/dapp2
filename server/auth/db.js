var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/loginDB');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// create a schema
var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        unique: true,
        requires: true
    },
    email: {
        type: String,
        unique: true,
        requires: true
    },
    hash: String,
    salt: String
}, {
    versionKey: false // No versions will be created on update, thats not really required here
});

userSchema.index({
    phone: Number,
    email: String
});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 1);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET");
};

var User = mongoose.model('User', userSchema);

module.exports = User;