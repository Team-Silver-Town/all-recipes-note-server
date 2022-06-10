const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    youtubeUrl: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    belongsToMenu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
    tips: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tip",
      },
    ],
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
  },
  { timestamps: true },
);

module.exports = mongoose.model("Recipe", recipeSchema);
