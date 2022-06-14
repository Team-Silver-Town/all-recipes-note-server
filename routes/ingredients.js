const express = require("express");
const router = express.Router();
const ingredientController = require("./controllers/ingredient.controller");
const { authenticate } = require("./middlewares/auth.middleware");

router.get("/", authenticate, ingredientController.getIngredients);

module.exports = router;
