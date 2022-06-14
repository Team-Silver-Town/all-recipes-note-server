const express = require("express");
const router = express.Router();
const categoryController = require("./controllers/category.controller");
const { authenticate } = require("./middlewares/auth.middleware");

router.get("/", authenticate, categoryController.getCategories);
router.get(
  "/:category_name",
  authenticate,
  categoryController.getCategoryByName,
);

module.exports = router;
