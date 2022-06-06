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
  },
  { timestamps: true },
);

module.exports = mongoose.model("Tip", tipSchema);
