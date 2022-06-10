const Ingredient = require("../models/Ingredient");

class IngredientService {
  constructor(ingredientModel) {
    this.ingredientModel = ingredientModel;
  }

  async getAllIngredients() {
    const ingredients = await this.ingredientModel.find().lean();

    return ingredients;
  }
}

module.exports = new IngredientService(Ingredient);
