const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    recipes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
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
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
