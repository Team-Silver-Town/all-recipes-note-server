const UserService = require("../../services/UserService");

exports.findUser = async (req, res, next) => {
  const { query } = req;
  const user = await UserService.findUser(query);

  return res.send(user);
};

exports.createUser = async (req, res, next) => {
  const userInfo = req.body;
  const user = await UserService.createUser(userInfo);

  return res.send(user);
};
