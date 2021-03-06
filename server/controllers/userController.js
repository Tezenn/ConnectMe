const userModel = require('../models/userModel');

module.exports.create = async ctx => {
  let user = ctx.request.body;
  userModel.addUser(user);
  ctx.status = 201;
};

module.exports.getUsers = async ctx => {
  ctx.body = await userModel.getUsers();
  ctx.status = 200;
};

module.exports.nearMe = async ctx => {
  ctx.body = await userModel.nearMe(ctx.request.body);
  ctx.status = 200;
};

module.exports.login = async ctx => {
  const user = await userModel.login(ctx.request.body);
  if (user) {
    ctx.body = user;
    ctx.status = 200;
  } else {
    ctx.body = { error: 'not found' };
    ctx.status = 404;
  }
};

module.exports.addMessage = async ctx => {
  let message = ctx.request.body;
  ctx.body = await userModel.addMessage(message);
  ctx.status = 201;
};

module.exports.getMessages = async ctx => {
  let sender = ctx.request.body.sender;
  let receiver = ctx.request.body.receiver;
  ctx.body = await userModel.getMessages(sender, receiver);
  ctx.status = 200;
};

module.exports.getMyMessages = async ctx => {
  let receiver = ctx.request.body;
  ctx.body = await userModel.getMyMessages(receiver);
  ctx.status = 200;
};
