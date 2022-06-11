const mongoose = require("mongoose");
const User = require("../models/User");
const Recipe = require("../models/Recipe");
const Tip = require("../models/Tip");

class TipService {
  constructor(tipModel) {
    this.tipModel = tipModel;
  }

  async getAllTips() {
    const allTips = await this.tipModel
      .find()
      .populate("creator")
      .populate("relatedRecipe")
      .lean();

    return allTips;
  }

  async createNewTip({ email, relatedRecipe, content }) {
    const user = await User.findOne({ email });
    const recipe = await Recipe.findById(relatedRecipe);

    const createdTip = await this.tipModel.create({
      creator: user._id,
      relatedRecipe,
      content,
    });

    const mongoSession = await mongoose.startSession();
    mongoSession.startTransaction();

    user.tips.push(createdTip);
    recipe.tips.push(createdTip);
    await createdTip.save({ session: mongoSession });
    await user.save({ session: mongoSession });
    await recipe.save({ session: mongoSession });

    await mongoSession.commitTransaction();
    mongoSession.endSession();
  }

  async updateTip({ tip_id, content }) {
    const tip = await this.tipModel.findById(tip_id);

    const mongoSession = await mongoose.startSession();
    mongoSession.startTransaction();

    tip.content = content;
    await tip.save({ session: mongoSession });

    await mongoSession.commitTransaction();
    mongoSession.endSession();
  }

  async updateTipLike({ email, tip_id, like }) {
    const tip = await this.tipModel.findById(tip_id);

    if (like === "like") {
      tip.liked.push(email);
    } else {
      tip.disliked.push(email);
    }

    await tip.save();
  }

  async cancelTipLike({ email, tip_id, like }) {
    const tip = await this.tipModel.findById(tip_id);

    if (like === "like") {
      const index = tip.liked.indexOf(email);

      tip.liked.splice(index, 1);
    } else {
      const index = tip.disliked.indexOf(email);

      tip.disliked.splice(index, 1);
    }

    await tip.save();
  }

  async deleteTip({ tip_id }) {
    const tip = await this.tipModel.findById(tip_id);
    const user = await User.findById(tip.creator._id);
    const recipe = await Recipe.findById(tip.relatedRecipe._id);

    const indexUser = user.tips.indexOf(tip._id);
    const indexRecipe = recipe.tips.indexOf(tip._id);

    user.tips.splice(indexUser, 1);
    recipe.tips.splice(indexRecipe, 1);

    const mongoSession = await mongoose.startSession();
    mongoSession.startTransaction();

    await this.tipModel.deleteOne({ _id: tip_id }, { session: mongoSession });
    await user.save({ session: mongoSession });
    await recipe.save({ session: mongoSession });

    await mongoSession.commitTransaction();
    mongoSession.endSession();
  }
}

module.exports = new TipService(Tip);
