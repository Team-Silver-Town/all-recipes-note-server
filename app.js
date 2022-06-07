const express = require("express");
const initiateMiddlewares = require("./loaders/middleware");
const initiateRouters = require("./loaders/router");
const initiateErrorHandler = require("./loaders/errorHandler");
const db = require("./db/mongo");

const app = express();

db.connect();
initiateMiddlewares(app);
initiateRouters(app);
initiateErrorHandler(app);

module.exports = app;
