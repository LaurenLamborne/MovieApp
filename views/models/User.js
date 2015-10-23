var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  username: {lowercase: true, unique: true, required: true, type: String},
  email: {lowercase: true, unique: true, required: true, type: String},
  salt: String,
  passwordHash: String
});

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.checkPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return (hash === this.passwordHash);
};

UserSchema.methods.createToken = function() {
  return jwt.sign({
    _id: this._id,
    username: this.username,
    email: this.email
  }, "This_IS_My_sEcReT_PhRASE");
};

mongoose.model('User', UserSchema);
