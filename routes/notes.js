const express = require("express");
const router = express.Router();
const noteController = require("./controllers/note.controller");

router.get("/", noteController.getAllNotes);
router.post("/", noteController.createNote);
router.get("/top10", noteController.getTopTenNotes);
router.get("/:note_id", noteController.getNote);
router.patch("/:note_id", noteController.updateNote);
router.delete("/:note_id", noteController.deleteNote);
router.patch("/:note_id/likes", noteController.updateNoteLike);
router.patch("/:note_id/unlikes", noteController.cancelNoteLike);

module.exports = router;
