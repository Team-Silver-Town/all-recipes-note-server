const express = require("express");
const router = express.Router();
const userController = require("./controllers/user.controller");

router.get("/:user_id/notes", userController.getMyNotes);

module.exports = router;
