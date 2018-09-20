const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/connect_me');

const db = mongoose.connection;

//user schema
let user = new mongoose.Schema({
  username: String,
  baseLocation: String,
  topics: [String]
});

//user model
let User = mongoose.model('User', user);

module.exports = { db, user, User };
