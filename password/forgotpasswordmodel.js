const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
});

module.exports = mongoose.model('pw', schema);