const MenuService = require("../../services/MenuService");

exports.getMenus = async (req, res, next) => {
  const menus = await MenuService.getAllMenus();

  return res.status(200).send(menus);
};

exports.getTop5Menus = async (req, res, next) => {
  const menus = await MenuService.getTop5Menus();

  return res.status(200).send(menus);
};

exports.createMenu = async (req, res, next) => {
  const { category_id, menuName } = req.body;

  await MenuService.createNewMenu(category_id, menuName);

  return res.status(200).send({ isSuccess: true });
};
