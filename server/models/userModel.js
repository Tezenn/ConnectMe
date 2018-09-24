const db = require('../db');

module.exports.addUser = async user => {
  let newUser = new db.User({
    username: user.username.toLowerCase(),
    location: {
      type: 'Point',
      coordinates: [user.location.lng, user.location.lat]
    },
    topics: user.topics.map(el => el.toLowerCase())
  });
  await newUser.save();
  console.log('user added to database');
};

module.exports.getUsers = async () => {
  let users = await db.User.find();
  return users;
};

module.exports.nearMe = async coords => {
  console.log(coords);
  let usersNear = await db.User.find({
    location: {
      $near: {
        $geometry: { type: 'Point', coordinates: [coords.long, coords.lat] },
        $maxDistance: 15000
      }
    }
  }).find((error, results) => {
    if (error) console.log(error);
    console.log(results);
  });
  return usersNear;
};

module.exports.login = async username => {
  let user = await db.User.findOne({ username: username.username });
  return user;
};

module.exports.addMessage = async message => {
  let newMessage = new db.Message({
    sender: message.sender,
    receiver: message.receiver,
    date: message.date,
    text: message.text
  });
  await newMessage.save();
  console.log('message stored');
};

module.exports.getMessages = async (sender, receiver) => {
  let ourMess = await db.Message.find({
    $or: [
      { sender: sender, receiver: receiver },
      { sender: receiver, receiver: sender }
    ]
  }).sort('date');
  console.log(ourMess);

  return ourMess;
};
