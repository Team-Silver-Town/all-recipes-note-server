const TipService = require("../../services/TipService");

exports.getTips = async (req, res, next) => {
  const tips = await TipService.getAllTips();

  return res.status(200).send(tips);
};

exports.getTopTenTips = async (req, res, next) => {
  const topTenTips = await TipService.getTopTenTips();

  return res.status(200).send(topTenTips);
};

exports.getTipsByRecipeId = async (req, res, next) => {
  const { recipe_id } = req.params;
  const tipsByRecipeId = await TipService.getTipsByRecipeId({ recipe_id });

  return res.status(200).send(tipsByRecipeId);
};

exports.createTip = async (req, res, next) => {
  const newTip = req.body;

  await TipService.createNewTip(newTip);

  return res.status(200).send("success");
};

exports.updateTip = async (req, res, next) => {
  const { tip_id, content } = req.body;

  console.log(tip_id, content);

  await TipService.updateTip({ tip_id, content });

  return res.status(200).send("success");
};

exports.updateTipLike = async (req, res, next) => {
  const { email, tip_id, like } = req.body;

  await TipService.updateTipLike({ email, tip_id, like });

  return res.status(200).send("success");
};

exports.cancelTipLike = async (req, res, next) => {
  const updatedData = req.body;

  await TipService.cancelTipLike(updatedData);

  return res.status(200).send("success");
};

exports.deleteTip = async (req, res, next) => {
  const { tip_id } = req.params;

  await TipService.deleteTip({ tip_id });

  return res.status(200).send("success");
};
