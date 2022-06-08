const createError = require("http-errors");

const {
  INVALID_TOKEN,
  TOKEN_DOES_NOT_EXIST,
  UNAUTHORIZED_ACCESS,
  TOKEN_EXPIRED,
} = require("../constants/ErrorConstants");

const errorHandler = (err, req, res, next) => {
  console.log(err);
  const error = { ...err, name: err.name, message: err.message };

  switch (error.name) {
    case INVALID_TOKEN:
    case TOKEN_DOES_NOT_EXIST:
    case UNAUTHORIZED_ACCESS:
      return res.status(200).json({ success: false, message: error.name });

    case TOKEN_EXPIRED:
      return res.status(200).json({
        success: false,
        message: "토큰이 만료됐습니다. 다시 로그인 해주세요.",
      });

    case "MongoServerError":
      return res
        .status(500)
        .json({ success: false, message: "Could not save data" });
  }

  res.status(500).json({ success: false, message: "server error" });
};

const initiateErrorHandler = (app) => {
  app.use(function (req, res, next) {
    next(createError(404));
  });

  app.use(errorHandler);
};

module.exports = initiateErrorHandler;
