const Category = require("../models/Category");

class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  async getAllCategories() {
    const categories = await this.categoryModel.find().populate("menus").lean();

    return categories;
  }

  async getCategoryByName(category_name) {
    const categoryData = await this.categoryModel
      .find({ name: category_name })
      .populate({
        path: "menus",
        populate: {
          path: "recipes",
          model: "Recipe",
        },
      })
      .lean();

    const resultData = categoryData[0];

    resultData.menus
      .sort((a, b) => {
        const aRecipes = a.recipes;
        const bRecipes = b.recipes;
        const aNumberOfRecipes = aRecipes.length;
        const bNumberOfRecipes = bRecipes.length;
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
      })
      .splice(10);

    return resultData;
  }
}

module.exports = new CategoryService(Category);
