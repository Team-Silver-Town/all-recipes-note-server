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
  const { youtubeUrl } = req.body;
  const recipe = await RecipeService.getRecipe(youtubeUrl);

  return res.status(200).send(recipe);
};
