const NoteService = require("../../services/NoteService");

exports.getAllNotes = async (req, res, next) => {
  const notes = await NoteService.getAllNotes();

  return res.status(200).send(notes);
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
  const updatedData = req.body;

  await NoteService.updateNote(updatedData);

  return res.status(200).send("success");
};

exports.updateNotePopularity = async (req, res, next) => {
  const updatedData = req.body;

  await NoteService.updateNotePopularity(updatedData);

  return res.status(200).send("success");
};
