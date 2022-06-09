const mongoose = require("mongoose");
const User = require("../models/User");
const Recipe = require("../models/Recipe");
const Note = require("../models/Note");
const IngredientService = require("../services/NoteService");

class NoteService {
  constructor(noteModel) {
    this.noteModel = noteModel;
  }

  async getAllNotes() {
    const allNotes = await this.noteModel
      .find()
      .populate("creator")
      .populate("relatedRecipe")
      .populate(
        {
          path: "ingredients",
          populate: {
            path: "ingredient",
            model: "Ingredient",
          },
        },
        {
          path: "ingredients",
          populate: {
            path: "unit",
            model: "Unit",
          },
        },
      )
      .lean();

    return allNotes;
  }

  async createNewNote({ email, recipeId }) {
    const user = await User.findOne({ email });
    const recipe = await Recipe.findById(recipeId);

    const mongoSession = await mongoose.startSession();
    mongoSession.startTransaction();

    const createdNote = this.noteModel.create({
      creator: user._id,
      relatedRecipe: recipe._id,
    });
    user.notes.push(createdNote);
    recipe.notes.push(createdNote);
    await user.save({ session: mongoSession });
    await recipe.save({ session: mongoSession });

    await mongoSession.commitTransaction();
    mongoSession.endSession();
  }

  async updateNote({ noteId, ingredients, content, visibility }) {
    const note = await Note.findById(noteId);
    const ingredientsData = IngredientService.getIngredientsData(ingredients);

    note.ingredients = ingredientsData;
    note.content = content;
    note.visibility = visibility;

    await note.save();

    return note.lean();
  }

  async updateNotePopularity({ email, noteId, like }) {
    const note = await Note.findById(noteId);

    if (like === "like") {
      note.liked.push(email);
    } else {
      note.disliked.push(email);
    }

    await note.save();

    return note.lean();
  }
}

module.exports = new NoteService(Note);
