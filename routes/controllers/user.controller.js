const NoteService = require("../../services/NoteService");

exports.getMyNotes = async (req, res, next) => {
  const { user_id } = req.params;
  const notes = await NoteService.getNotesByCreator(user_id);

  return res.status(200).send(notes);
};
