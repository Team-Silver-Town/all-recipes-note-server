const Menu = require("../models/Menu");
const Category = require("../models/Category");
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
          numgerOfRecipes: { $size: "$recipes" },
        },
      },
      { $sort: { numgerOfRecipes: -1 } },
      { $limit: 5 },
    ]);

    return results;
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
