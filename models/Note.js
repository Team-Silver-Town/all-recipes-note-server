const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    relatedRecipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },
    ingredients: [
      {
        ingredient: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Ingredient",
        },
        portion: {
          type: Number,
          default: 0,
        },
        unit: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Unit",
        },
      },
    ],
    content: {
      type: String,
      default: "",
    },
    like: {
      type: Number,
      default: 0,
      required: true,
    },
    dislike: {
      type: Number,
      default: 0,
      required: true,
    },
    visibility: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Note", noteSchema);
