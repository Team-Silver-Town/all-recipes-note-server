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

exports.updateRecipeLike = async (req, res, next) => {
  console.log("UPDATE!!!!!!");
  const { email, recipe_id, like } = req.body;

  await RecipeService.updateRecipeLike({ email, recipe_id, like });

  return res.status(200).send("success");
};

exports.cancelRecipeLike = async (req, res, next) => {
  const { email, recipe_id, like } = req.body;

  await RecipeService.cancelRecipeLike({ email, recipe_id, like });

  return res.status(200).send("success");
};
