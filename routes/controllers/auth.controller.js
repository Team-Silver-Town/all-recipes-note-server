const UserService = require("../../services/UserService");

exports.findUser = async (req, res, next) => {
  const { email } = req.query;
  const user = await UserService.findUser({ email });

  return res.send(user);
};

exports.createUser = async (req, res, next) => {
  const { nickname, email } = req.body;
  const user = await UserService.createUser({ nickname, email });

  return res.send(user);
};
