const ErrorResponse = require("../../utils/ErrorResponse");
const {
  TOKEN_DOES_NOT_EXIST,
  INVALID_TOKEN,
  UNAUTHORIZED_ACCESS,
  TOKEN_EXPIRED,
} = require("../../constants/ErrorConstants");

const firebase = require("../../config/auth");
const asyncCatcher = require("../../utils/asyncCatcher");
const UserService = require("../../services/UserService");

exports.authenticate = asyncCatcher(async (req, res, next) => {
  // token 받아오기
  const authToken = req.headers.authorization;

  if (!authToken) {
    return next(new ErrorResponse(TOKEN_DOES_NOT_EXIST));
  }

  if (authToken.split(" ")[0] !== "Bearer") {
    return next(new ErrorResponse(INVALID_TOKEN));
  }

  const token = authToken.split(" ")[1];

  // firebaseUser 정보 받아오기
  let firebaseUser;

  try {
    firebaseUser = await firebase.verifyIdToken(token);
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse(TOKEN_EXPIRED));
  }

  if (!firebaseUser) {
    return next(new ErrorResponse(UNAUTHORIZED_ACCESS));
  }

  // firebaseUser 정보기반으로 DB에서 user 정보 받아오기

  let user = await UserService.findUser({ email: firebaseUser.email });

  if (!user) {
    user = await UserService.createUser(
      firebaseUser.email,
      firebaseUser.nickname,
    );
  }

  req.user = user;

  next();
});
