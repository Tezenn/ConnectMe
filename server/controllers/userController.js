const userModel = require('../models/userModel');

module.exports.create = async ctx => {
  let user = ctx.request.body;
  console.log('body: ', user);
  userModel.addUser(user);
};
