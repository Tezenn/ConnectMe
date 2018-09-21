const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/connect_me');

const db = mongoose.connection;

//user schema
let user = new mongoose.Schema({
  username: String,
  location: {
    type: { type: String },
    coordinates: [{ type: Number }]
  },
  topics: [String]
});

user.index({ location: '2dsphere' });

//user model
let User = mongoose.model('User', user);

module.exports = { db, user, User };
