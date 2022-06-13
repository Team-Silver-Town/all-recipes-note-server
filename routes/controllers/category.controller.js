const CategoryService = require("../../services/CategoryService");

exports.getCategories = async (req, res, next) => {
  const categories = await CategoryService.getAllCategories();

  return res.status(200).send(categories);
};

exports.getCategoryByName = async (req, res, next) => {
  const { category_name } = req.params;

  const categories = await CategoryService.getCategoryByName(category_name);

  return res.status(200).send(categories);
};
