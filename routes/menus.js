const express = require("express");
const router = express.Router();
const menuController = require("./controllers/menu.controller");

router.get("/top5", menuController.getTop5Menus);
router.get("/:menu_id", menuController.getMenu);

module.exports = router;
