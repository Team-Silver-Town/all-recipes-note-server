const express = require("express");
const router = express.Router();
const authController = require("./controllers/auth.controller");
const { authenticate } = require("./middlewares/auth.middleware");

router.get("/", authController.findUser);
router.post("/", authenticate, authController.createUser);
router.patch("/", authenticate, authController.updateUser);

module.exports = router;
