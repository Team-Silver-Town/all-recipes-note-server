const express = require("express");
const router = express.Router();
const userController = require("./controllers/user.controller");
const { authenticate } = require("./middlewares/auth.middleware");

router.get("/:user_id/notes", authenticate, userController.getMyNotes);

module.exports = router;
