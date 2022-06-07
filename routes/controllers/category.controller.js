const CategoryService = require("../../services/CategoryService");

exports.getCategories = async (req, res, next) => {
  const categories = await CategoryService.getAllCategories();

  return res.status(200).send(categories);
};

//temporary
exports.getCategory = async (req, res, next) => {
  const category_id = req.body.category_id;
  const categories = await CategoryService.getCategory(category_id);

  return res.status(200).send(categories);
};
