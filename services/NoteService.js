const mongoose = require("mongoose");
const User = require("../models/User");
const Recipe = require("../models/Recipe");
const Note = require("../models/Note");
const { handleIngredientsData } = require("../utils/mongooseUtils");

class NoteService {
  constructor(noteModel) {
    this.noteModel = noteModel;
  }

  async getAllNotes() {
    const allNotes = await this.noteModel
      .find()
      .populate("creator")
      .populate("relatedRecipe")
      .lean();

    return allNotes;
  }

  async createNewNote({
    email,
    relatedRecipe,
    ingredients,
    content,
    visibility,
  }) {
    const user = await User.findOne({ email });
    const recipe = await Recipe.findById(relatedRecipe);

    const mongoSession = await mongoose.startSession();
    mongoSession.startTransaction();

    const ingredientsData = await handleIngredientsData(
      ingredients,
      mongoSession,
    );

    const createdNote = await this.noteModel.create({
      creator: user._id,
      relatedRecipe,
      ingredients: ingredientsData,
      content,
      visibility,
    });

    user.notes.push(createdNote);
    recipe.notes.push(createdNote);
    await createdNote.save({ session: mongoSession });
    await user.save({ session: mongoSession });
    await recipe.save({ session: mongoSession });

    await mongoSession.commitTransaction();
    mongoSession.endSession();
  }

  async updateNote({ note_id, ingredients, content, visibility }) {
    const note = await this.noteModel.findById(note_id);

    const mongoSession = await mongoose.startSession();
    mongoSession.startTransaction();

    const ingredientsData = await handleIngredientsData(
      ingredients,
      mongoSession,
    );

    console.log(ingredientsData);

    note.ingredients = ingredientsData;
    note.content = content;
    note.visibility = visibility;
    await note.save({ session: mongoSession });

    await mongoSession.commitTransaction();
    mongoSession.endSession();
  }

  async updateNotePopularity({ email, note_id, like }) {
    const note = await this.noteModel.findById(note_id);

    if (like === "like") {
      note.liked.push(email);
    } else {
      note.disliked.push(email);
    }

    await note.save();
  }
}

module.exports = new NoteService(Note);
