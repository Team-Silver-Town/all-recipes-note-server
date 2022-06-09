const Recipe = require("../models/Recipe");
const Menu = require("../models/Menu");
const User = require("../models/User");
const mongoose = require("mongoose");
const Category = require("../models/Category");

class RecipeService {
  constructor(recipeModel) {
    this.recipeModel = recipeModel;
  }

  async createNewRecipe({
    email,
    youtubeUrl,
    thumbnailUrl,
    menuName,
    categoryName,
  }) {
    const user = await User.findOne({ email });
    let isNewMenu = false;
    let menu = await Menu.findOne({ name: menuName.trim() });
    const category = await Category.findOne({ name: categoryName });

    if (!menu) {
      isNewMenu = true;

      const createdMenu = new Menu({
        name: menuName,
        recipes: [],
      });

      menu = createdMenu;
    }

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
    isNewMenu && category.menus.push(menu._id);
    user.recipes.push(createdRecipe);
    menu.recipes.push(createdRecipe);
    await user.save({ session: mongoSession });
    await category.save({ session: mongoSession });
    await menu.save({ session: mongoSession });

    await mongoSession.commitTransaction();
    mongoSession.endSession();
  }

  async getAllRecipes() {
    const allRecipes = await this.recipeModel
      .find()
      .populate("postedBy")
      .populate("belongsToMenu")
      .lean();

    return allRecipes.slice(0, 5);
  }

  async getRecipe(youtubeUrl) {
    const recipe = await this.recipeModel.find({ youtubeUrl });

    return recipe;
  }
}

module.exports = new RecipeService(Recipe);
