const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");
const Menu = require("../models/Menu");
const User = require("../models/User");
const Category = require("../models/Category");
const Note = require("../models/Note");

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
    let menu = await Menu.findOne({ name: menuName.trim() });
    const category = await Category.findOne({ name: categoryName });
    let isNewMenu = false;

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

    const createdNote = new Note({
      creator: user._id,
      relatedRecipe: createdRecipe._id,
    });

    isNewMenu && category.menus.push(menu._id);
    createdRecipe.notes.push(createdNote);
    user.recipes.push(createdRecipe);
    menu.recipes.push(createdRecipe);

    const mongoSession = await mongoose.startSession();
    mongoSession.startTransaction();

    await createdNote.save({ session: mongoSession });
    await createdRecipe.save({ session: mongoSession });
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

    return allRecipes;
  }

  async getRecipe(recipeId) {
    const recipe = await this.recipeModel
      .findById(recipeId)
      .populate("postedBy")
      .populate("belongsToMenu")
      .populate({
        path: "notes",
        populate: {
          path: "creator",
          model: "User",
        },
      })
      .populate("tips")
      .lean();

    return recipe;
  }

  async getRecipesByListArray(idListArray) {
    const results = await this.recipeModel.find({ _id: { $in: idListArray } });

    return results;
  }
}

module.exports = new RecipeService(Recipe);
