const mongoose = require("mongoose");

const tipSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    relatedRecipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },
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
  },
  { timestamps: true },
);

module.exports = mongoose.model("Tip", tipSchema);
