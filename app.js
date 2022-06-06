const dotenv = require("dotenv");
dotenv.config();
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const usersRouter = require("./routes/users");
const recipesRouter = require("./routes/recipes");
const notesRouter = require("./routes/notes");
const tipsRouter = require("./routes/tips");
const categoriesRouter = require("./routes/categories");
const menusRouter = require("./routes/menus");
const ingredientsRouter = require("./routes/ingredients");
const unitsRouter = require("./routes/units");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", usersRouter);
app.use("/api/recipes", recipesRouter);
app.use("/api/notes", notesRouter);
app.use("/api/tips", tipsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/menus", menusRouter);
app.use("/api/ingredients", ingredientsRouter);
app.use("/api/units", unitsRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
