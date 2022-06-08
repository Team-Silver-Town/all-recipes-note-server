const express = require("express");
const router = express.Router();
const authController = require("./controllers/auth.controller");

router.get("/", authController.findUser);
router.post("/", authController.createUser);
router.patch("/", authController.patchUser);

module.exports = router;
