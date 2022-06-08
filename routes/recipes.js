const express = require("express");
const router = express.Router();
const recipeController = require("./controllers/recipe.controller");

router.get("/", recipeController.getRecipes);
router.post("/new", recipeController.createRecipe);
router.get("/:recipe_id", recipeController.getRecipe);

module.exports = router;
