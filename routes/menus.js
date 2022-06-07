const express = require("express");
const router = express.Router();
const menuController = require("./controllers/menu.controller");

/* GET users listing. */
router.get("/", menuController.getMenus);

module.exports = router;
