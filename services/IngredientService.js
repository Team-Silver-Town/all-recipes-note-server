const Ingredient = require("../models/Ingredient");
const Unit = require("../models/Unit");

class IngredientService {
  constructor(ingredientModel) {
    this.ingredientModel = ingredientModel;
  }

  async getAllIngredients() {
    const ingredients = await this.ingredientModel.find().lean();

    return ingredients;
  }

  async getIngredientsData(ingredients) {
    const ingredientsData = [];

    ingredients.forEach(async ({ ingredientName, portion, unitName }) => {
      let ingredient = await Ingredient.findOne({
        name: ingredientName.trim(),
      });
      let unit = await Unit.findOne({ name: unitName.trim() });

      if (!ingredient) {
        ingredient = await Ingredient.create({ name: ingredientName });
      }

      if (!unit) {
        unit = await Unit.create({ name: unitName });
      }

      ingredientsData.push({
        ingredient,
        portion,
        unit,
      });
    });

    return ingredientsData;
  }
}

module.exports = new IngredientService(Ingredient);
