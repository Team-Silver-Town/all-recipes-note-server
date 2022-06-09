const express = require("express");
const router = express.Router();
const noteController = require("./controllers/note.controller");

router.get("/", noteController.getAllNotes);
router.post("/", noteController.createNote);
router.patch("/:note_id", noteController.updateNote);
router.patch("/:note_id/like", noteController.updateNotePopularity);

module.exports = router;
