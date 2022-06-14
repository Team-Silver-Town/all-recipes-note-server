const express = require("express");
const router = express.Router();
const noteController = require("./controllers/note.controller");
const { authenticate } = require("./middlewares/auth.middleware");

router.get("/", authenticate, noteController.getAllNotes);
router.post("/", authenticate, noteController.createNote);
router.get("/top10", authenticate, noteController.getTopTenNotes);
router.get("/:note_id", authenticate, noteController.getNote);
router.patch("/:note_id", authenticate, noteController.updateNote);
router.delete("/:note_id", authenticate, noteController.deleteNote);
router.patch("/:note_id/likes", authenticate, noteController.updateNoteLike);
router.patch("/:note_id/unlikes", authenticate, noteController.cancelNoteLike);

module.exports = router;
