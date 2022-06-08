const express = require("express");
const router = express.Router();
const authController = require("./controllers/auth.controller");

/* GET users listing. */
router.get("/", authController.findUser);

router.post("/", authController.createUser);

module.exports = router;
