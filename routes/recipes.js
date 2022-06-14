const express = require("express");
const router = express.Router();
const recipeController = require("./controllers/recipe.controller");
const { authenticate } = require("./middlewares/auth.middleware");

router.get("/", recipeController.getRecipes);
router.post("/new", authenticate, recipeController.createRecipe);
router.get(
  "/latest-top10",
  authenticate,
  recipeController.getLatestTop10Recipes,
);
router.get("/top10", authenticate, recipeController.getTop10Recipes);
router.get("/:recipe_id", authenticate, recipeController.getRecipe);
router.patch(
  "/:recipe_id/likes",
  authenticate,
  recipeController.updateRecipeLike,
);
router.patch(
  "/:recipe_id/unlikes",
  authenticate,
  recipeController.cancelRecipeLike,
);

module.exports = router;
