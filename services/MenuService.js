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

  async createNewMenu(category_id, menuName) {
    const menu = this.menuModel.find({ name: menuName.trim() });
    const category = await Category.findById(category_id).lean();

    if (menu) return;

    const mongoSession = await mongoose.startSession();

    mongoSession.startTransaction();

    await this.menuModel.create({ name: menuName });
    category.menus.push(this.menuModel);
    await category.save();

    await mongoSession.commitTransaction();
    mongoSession.endSession();
  }
}

module.exports = new MenuService(Menu);
