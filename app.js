const express = require("express");
const initiateMiddlewares = require("./loaders/middleware");
const initiateRouters = require("./loaders/router");
const initiateErrorHandler = require("./loaders/errorHandler");
// const path = require("path");
const db = require("./loaders/mongo");
db.connect();

const app = express();

initiateMiddlewares(app);
initiateRouters(app);
// app.use(express.static("/all-recipes-note-client/build"));
// app.get("*", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "../all-recipes-note-client/build/index.html"),
//   );
// });

initiateErrorHandler(app);

module.exports = app;
