const IngredientService = require("../../services/IngredientService");

exports.getIngredients = async (req, res, next) => {
  const ingredients = await IngredientService.getAllIngredients();

  return res.status(200).send(ingredients);
};
