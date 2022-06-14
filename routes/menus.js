const express = require("express");
const router = express.Router();
const menuController = require("./controllers/menu.controller");
const { authenticate } = require("./middlewares/auth.middleware");

router.get("/top5", authenticate, menuController.getTop5Menus);
router.get("/:menu_id", authenticate, menuController.getMenu);

module.exports = router;
