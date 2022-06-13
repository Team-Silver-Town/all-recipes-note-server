const express = require("express");
const router = express.Router();
const recipeController = require("./controllers/recipe.controller");

router.get("/", recipeController.getRecipes);
router.post("/new", recipeController.createRecipe);
router.get("/latest-top10", recipeController.getLatestTop10Recipes);
router.get("/top10", recipeController.getTop10Recipes);
router.get("/:recipe_id", recipeController.getRecipe);
router.patch("/:recipe_id/likes", recipeController.updateRecipeLike);
router.patch("/:recipe_id/unlikes", recipeController.cancelRecipeLike);

module.exports = router;
