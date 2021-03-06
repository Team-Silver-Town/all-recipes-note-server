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

  async getNote(note_id) {
    const note = await this.noteModel
      .findById(note_id)
      .populate("creator")
      .populate("relatedRecipe")
      .lean();

    return note;
  }

  async getNotesByCreator(user_id) {
    const results = await this.noteModel
      .find({ creator: user_id })
      .populate({
        path: "relatedRecipe",
        populate: {
          path: "belongsToMenu",
          model: "Menu",
        },
      })
      .lean();

    return results;
  }

  async getTopTenNotes() {
    const results = await this.noteModel.aggregate([
      {
        $project: {
          relatedRecipe: 1,
          creator: 1,
          visibility: 1,
          updatedAt: 1,
          numgerOfLikes: { $size: "$liked" },
          numberOfDislikes: { $size: "$disliked" },
        },
      },
      { $match: { visibility: true } },
      { $sort: { numgerOfLikes: -1, updatedAt: -1 } },
      { $limit: 10 },
    ]);

    await Note.populate(results, {
      path: "relatedRecipe",
      populate: {
        path: "belongsToMenu",
        model: "Menu",
      },
    });

    await User.populate(results, {
      path: "creator",
    });

    return results;
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

    const createdNote = await new Note({
      creator: user._id,
      relatedRecipe: recipe._id,
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

    note.ingredients = ingredientsData;
    note.content = content;
    note.visibility = visibility;
    await note.save({ session: mongoSession });

    await mongoSession.commitTransaction();
    mongoSession.endSession();
  }

  async updateNoteLike({ email, note_id, like }) {
    const note = await this.noteModel.findById(note_id);

    if (!note.liked.includes(email) && !note.disliked.includes(email)) {
      if (like === "like") {
        !note.liked.includes(email) && note.liked.push(email);
      } else {
        !note.disliked.includes(email) && note.disliked.push(email);
      }
    }

    await note.save();
  }

  async cancelNoteLike({ email, note_id, like }) {
    const note = await this.noteModel.findById(note_id);

    if (like === "like") {
      const index = note.liked.indexOf(email);

      note.liked.splice(index, 1);
    } else {
      const index = note.disliked.indexOf(email);

      note.disliked.splice(index, 1);
    }

    await note.save();
  }

  async deleteNote({ note_id }) {
    const note = await this.noteModel.findById(note_id);
    const user = await User.findById(note.creator._id);
    const recipe = await Recipe.findById(note.relatedRecipe._id);

    const indexUser = user.notes.indexOf(note._id);
    const indexRecipe = recipe.notes.indexOf(note._id);

    user.notes.splice(indexUser, 1);
    recipe.notes.splice(indexRecipe, 1);

    const mongoSession = await mongoose.startSession();
    mongoSession.startTransaction();

    await this.noteModel.deleteOne({ _id: note_id }, { session: mongoSession });
    await user.save({ session: mongoSession });
    await recipe.save({ session: mongoSession });

    await mongoSession.commitTransaction();
    mongoSession.endSession();
  }
}

module.exports = new NoteService(Note);
