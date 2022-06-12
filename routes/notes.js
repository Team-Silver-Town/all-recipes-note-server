const express = require("express");
const router = express.Router();
const noteController = require("./controllers/note.controller");

router.get("/", noteController.getAllNotes);
router.post("/", noteController.createNote);
router.get("/:note_id", noteController.getNote);
router.get("/:user_id", noteController.getNotesByUserId);
router.patch("/:note_id", noteController.updateNote);
router.patch("/:note_id/likes", noteController.updateNoteLike);
router.patch("/:note_id/unlikes", noteController.cancelNoteLike);

module.exports = router;
