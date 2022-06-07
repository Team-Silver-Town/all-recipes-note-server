const createError = require("http-errors");

exports.asyncErrorHandler = (errorMessage, callback) => {
  return async (req, res, next) => {
    try {
      return await callback(req, res, next);
    } catch (err) {
      const error = createError(500, errorMessage);

      return next(error);
    }
  };
};
