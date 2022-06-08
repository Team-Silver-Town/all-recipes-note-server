const Recipe = require("../models/Recipe");
const Menu = require("../models/Menu");
const User = require("../models/User");
const mongoose = require("mongoose");

class RecipeService {
  constructor(recipeModel) {
    this.recipeModel = recipeModel;
  }

  async createNewRecipe({ email, youtubeUrl, thumbnailUrl, menuName }) {
    const user = await User.find({ email }).lean();
    const menu = await Menu.findOne({ name: menuName });

    const createdRecipe = new Recipe({
      postedBy: user._id,
      youtubeUrl,
      thumbnailUrl,
      belongsToMenu: menu._id,
      notes: [],
      tips: [],
    });

    const mongoSession = await mongoose.startSession();
    mongoSession.startTransaction();

    await createdRecipe.save({ session: mongoSession });
    menu.recipes.push(createdRecipe);
    await menu.save({ session: mongoSession });

    await mongoSession.commitTransaction();
    mongoSession.endSession();
  }

  async getAllRecipes() {
    const allRecipes = await this.model
      .find()
      .populate("postedBy")
      .populate("belongsToMenu")
      .populate("notes")
      .populate("tips")
      .lean();

    return allRecipes;
  }

  async getRecipe(youtubeUrl) {
    const recipe = await this.model.find({ youtubeUrl });

    return recipe;
  }
}

module.exports = new RecipeService(Recipe);
