const NoteService = require("../../services/NoteService");

exports.getAllNotes = async (req, res, next) => {
  const notes = await NoteService.getAllNotes();

  return res.status(200).send(notes);
};

exports.getNote = async (req, res, next) => {
  const { note_id } = req.params;

  const note = await NoteService.getNote(note_id);

  return res.status(200).send(note);
};

exports.getNotesByUserId = async (req, res, next) => {
  const { user_id } = req.params;
  const notes = await NoteService.getNotesByCreator(user_id);

  return res.status(200).send(notes);
};

exports.getTopTenNotes = async (req, res, next) => {
  const topTenNotes = await NoteService.getTopTenNotes();

  return res.status(200).send(topTenNotes);
};

exports.createNote = async (req, res, next) => {
  const newNote = req.body;

  await NoteService.createNewNote(newNote);

  return res.status(200).send("success");
};

exports.updateNote = async (req, res, next) => {
  const { note_id, ingredients, content, visibility } = req.body;

  await NoteService.updateNote({ note_id, ingredients, content, visibility });

  return res.status(200).send("success");
};

exports.deleteNote = async (req, res, next) => {
  const { note_id } = req.params;

  await NoteService.deleteNote({ note_id });

  return res.status(200).send("success");
};

exports.updateNoteLike = async (req, res, next) => {
  const { email, note_id, like } = req.body;

  await NoteService.updateNoteLike({ email, note_id, like });

  return res.status(200).send("success");
};

exports.cancelNoteLike = async (req, res, next) => {
  const { email, note_id, like } = req.body;

  await NoteService.cancelNoteLike({ email, note_id, like });

  return res.status(200).send("success");
};
