const express = require("express");
const router = express.Router();
const ingredientController = require("./controllers/ingredient.controller");

router.get("/", ingredientController.getIngredients);

module.exports = router;
