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

//message schema
let message = new mongoose.Schema({
  sender: mongoose.Schema.Types.ObjectId,
  receiver: mongoose.Schema.Types.ObjectId,
  date: Date,
  text: String
});

user.index({ location: '2dsphere' });

//user model
let User = mongoose.model('User', user);

//message model
let Message = mongoose.model('Message', message);

module.exports = { db, user, User, message, Message };
