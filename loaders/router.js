const usersRouter = require("../routes/users");
const recipesRouter = require("../routes/recipes");
const notesRouter = require("../routes/notes");
const tipsRouter = require("../routes/tips");
const categoriesRouter = require("../routes/categories");
const menusRouter = require("../routes/menus");
const ingredientsRouter = require("../routes/ingredients");
const unitsRouter = require("../routes/units");
const authRouter = require("../routes/auth");

const initiateRouters = (app) => {
  app.use("/api/users", usersRouter);
  app.use("/api/recipes", recipesRouter);
  app.use("/api/notes", notesRouter);
  app.use("/api/tips", tipsRouter);
  app.use("/api/categories", categoriesRouter);
  app.use("/api/menus", menusRouter);
  app.use("/api/ingredients", ingredientsRouter);
  app.use("/api/units", unitsRouter);
  app.use("/api/auth", authRouter);
};

module.exports = initiateRouters;
