const Category = require("../models/Category");

class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  async getAllCategories() {
    const categories = await this.categoryModel.find().populate("menus").lean();
    return categories;
  }

  async getCategory(category_id) {
    const category = await this.categoryModel
      .findById(category_id)
      .populate("menus")
      .lean();
    return category;
  }
}

module.exports = new CategoryService(Category);
