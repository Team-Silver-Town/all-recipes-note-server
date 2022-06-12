const express = require("express");
const router = express.Router();
const noteController = require("./controllers/note.controller");

router.get("/", noteController.getAllNotes);
router.get("/top10", noteController.getTopTenNotes);
router.get("/:user_id", noteController.getNotesByUserId);
router.get("/:note_id", noteController.getNote);
router.get("/:user_id", noteController.getNotesByUserId);
router.post("/", noteController.createNote);
router.patch("/:note_id", noteController.updateNote);
router.patch("/:note_id/likes", noteController.updateNoteLike);
router.patch("/:note_id/unlikes", noteController.cancelNoteLike);
router.delete("/:note_id", noteController.deleteNote);

module.exports = router;
