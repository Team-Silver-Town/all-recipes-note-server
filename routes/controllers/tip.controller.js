const TipService = require("../../services/TipService");

exports.getTips = async (req, res, next) => {
  const tips = await TipService.getAllTips();

  return res.status(200).send(tips);
};

exports.createTip = async (req, res, next) => {
  const newTip = req.body;

  await TipService.createNewTip(newTip);

  return res.status(200).send("success");
};

exports.updateTip = async (req, res, next) => {
  const updatedData = req.body;

  await TipService.updateTip(updatedData);

  return res.status(200).send("success");
};

exports.updateTipLike = async (req, res, next) => {
  const updatedData = req.body;

  await TipService.updateTipLike(updatedData);

  return res.status(200).send("success");
};

exports.cancelTipLike = async (req, res, next) => {
  const updatedData = req.body;

  await TipService.cancelTipLike(updatedData);

  return res.status(200).send("success");
};

exports.deleteTip = async (req, res, next) => {
  const { tip_id } = req.body;

  await TipService.deleteTip({ tip_id });

  return res.status(200).send("success");
};
