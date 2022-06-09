const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    relatedRecipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
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
    liked: [
      {
        type: String,
      },
    ],
    disliked: [
      {
        type: String,
      },
    ],
    visibility: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Note", noteSchema);
