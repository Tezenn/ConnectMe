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
    senderName: message.senderName,
    receiverName: message.receiverName,
    date: message.date,
    text: message.text
  });
  await newMessage.save();
  return newMessage;
  console.log('message stored');
};

module.exports.getMessages = async (sender, receiver) => {
  console.log('sender: ', sender, 'receiver: ', receiver);
  let ourMess = await db.Message.find({
    $or: [
      { sender: sender._id, receiver: receiver.sender },
      { sender: receiver.sender, receiver: sender._id },
      { sender: sender._id, receiver: receiver._id },
      { sender: receiver._id, receiver: sender._id }
    ]
  }).sort('date');
  return ourMess;
};

module.exports.getMyMessages = async receiver => {
  let allMyMessages = await db.Message.find({
    $or: [{ receiver: receiver.receiver }, { sender: receiver.receiver }]
  });
  //dividing messages by users
  let x = allMyMessages.reduce((acc, next) => {
    if (next.sender != receiver.receiver && !acc[next.sender]) {
      acc[next.sender] = { username: next.senderName, messages: [next] };
    } else if (next.sender != receiver.receiver && acc[next.sender]) {
      acc[next.sender].messages.push(next);
    } else if (next.receiver != receiver.receiver && !acc[next.receiver]) {
      acc[next.receiver] = { username: next.receiverName, messages: [next] };
    } else if (next.receiver != receiver.receiver && acc[next.receiver]) {
      acc[next.receiver].messages.push(next);
    }
    return acc;
  }, {});
  return x;
};
