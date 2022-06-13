const Menu = require("../models/Menu");
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");
const mongoose = require("mongoose");

class MenuService {
  constructor(menuModel) {
    this.menuModel = menuModel;
  }

  async getAllMenus() {
    return await this.menuModel.find().lean();
  }

  async getTop5Menus() {
    const results = await this.menuModel.aggregate([
      {
        $project: {
          name: 1,
          recipes: 1,
          numberOfRecipes: { $size: "$recipes" },
        },
      },
      { $sort: { numberOfRecipes: -1 } },
      { $limit: 30 },
    ]);

    await Recipe.populate(results, {
      path: "recipes",
    });

    await results.sort((a, b) => {
      const aNumberOfRecipes = a.numberOfRecipes;
      const bNumberOfRecipes = b.numberOfRecipes;
      const aNumberOfLikes = a.recipes.reduce((prev, current) => {
        return prev + current.liked.length;
      }, 1);
      const bNumberOfLikes = b.recipes.reduce((prev, current) => {
        return prev + current.liked.length;
      }, 1);
      const aNumberOfDislikes = a.recipes.reduce((prev, current) => {
        return prev + current.disliked.length;
      }, 1);
      const bNumberOfDislikes = b.recipes.reduce((prev, current) => {
        return prev + current.disliked.length;
      }, 1);
      const aNumberOfNotes = a.recipes.reduce((prev, current) => {
        return prev + current.notes.length;
      }, 1);
      const bNumberOfNotes = b.recipes.reduce((prev, current) => {
        return prev + current.notes.length;
      }, 1);
      const aNumberOfTips = a.recipes.reduce((prev, current) => {
        return prev + current.tips.length;
      }, 1);
      const bNumberOfTips = b.recipes.reduce((prev, current) => {
        return prev + current.tips.length;
      }, 1);

      return (
        bNumberOfRecipes *
          (bNumberOfLikes - bNumberOfDislikes) *
          bNumberOfNotes *
          bNumberOfTips -
        aNumberOfRecipes *
          (aNumberOfLikes - aNumberOfDislikes) *
          aNumberOfNotes *
          aNumberOfTips
      );
    });

    return results.splice(0, 5);
  }

  async getMenu(menu_id) {
    const menu = this.menuModel.findById(menu_id).populate("recipes").lean();

    return menu;
  }

  async createNewMenu(category_id, menuName) {
    const menu = this.menuModel.find({ name: menuName.trim() });
    const category = await Category.findById(category_id);

    if (menu) return;

    const mongoSession = await mongoose.startSession();

    mongoSession.startTransaction();

    await this.menuModel.create({ name: menuName }, { session: mongoSession });
    category.menus.push(this.menuModel);
    await category.save({ session: mongoSession });

    await mongoSession.commitTransaction();
    mongoSession.endSession();
  }
}

module.exports = new MenuService(Menu);
