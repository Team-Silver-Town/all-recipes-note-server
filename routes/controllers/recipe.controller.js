const RecipeService = require("../../services/RecipeService");

exports.createRecipe = async (req, res, next) => {
  const newRecipe = req.body;

  try {
    await RecipeService.createNewRecipe(newRecipe);

    return res.status(200).send("success");
  } catch (error) {
    console.log(error);
  }
};

exports.getRecipes = async (req, res, next) => {
  try {
    const recipes = await RecipeService.getAllRecipes();

    return res.status(200).send(recipes);
  } catch (error) {}
};

exports.getRecipe = async (req, res, next) => {
  const { youtubeUrl } = req.body;

  try {
    const recipe = await RecipeService.getRecipe(youtubeUrl);

    return res.status(200).send(recipe);
  } catch (error) {
    //TODO: handle error
  }
};
