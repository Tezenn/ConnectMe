const userModel = require('../models/userModel');

module.exports.create = async ctx => {
  let user = ctx.request.body;
  console.log('body: ', user);
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
  ctx.body = await userModel.login(ctx.request.body);
  ctx.status = 200;
};
