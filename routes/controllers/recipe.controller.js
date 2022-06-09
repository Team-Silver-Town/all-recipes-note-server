const RecipeService = require("../../services/RecipeService");

exports.createRecipe = async (req, res, next) => {
  const newRecipe = req.body;

  await RecipeService.createNewRecipe(newRecipe);

  return res.status(200).send("success");
};

exports.getRecipes = async (req, res, next) => {
  const recipes = await RecipeService.getAllRecipes();

  return res.status(200).send(recipes);
};

exports.getRecipe = async (req, res, next) => {
  const { recipe_id } = req.params;
  const recipe = await RecipeService.getRecipe(recipe_id);

  return res.status(200).send(recipe);
};
