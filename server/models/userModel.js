const db = require('../db');

module.exports.addUser = async user => {
  let newUser = new db.User({
    username: user.username.toLowerCase(),
    baseLocation: user.baseLocation.toLowerCase(),
    topics: user.topics.map(el => el.toLowerCase())
  });
  await newUser.save();
  console.log('user added to database');
};
