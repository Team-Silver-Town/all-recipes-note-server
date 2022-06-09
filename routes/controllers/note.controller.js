const NoteService = require("../../services/NoteService");

exports.getAllNotes = async (req, res, next) => {
  const notes = await NoteService.getAllNotes();

  return res.status(200).send(notes);
};

exports.createNote = async (req, res, next) => {
  const newNote = req.body;

  await NoteService.createNewNote(newNote);

  return res.status(200).send("success");
};

exports.updateNote = async (req, res, next) => {
  const updatedData = req.body;

  const note = await NoteService.updateNote(updatedData);

  return res.status(200).send(note);
};

exports.updateNotePopularity = async (req, res, next) => {
  const updatedData = req.body;
  const note = await NoteService.updateNotePopularity(updatedData);

  return res.status(200).send(note);
};
