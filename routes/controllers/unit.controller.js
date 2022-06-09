const UnitService = require("../../services/UnitService");

exports.getUnits = async (req, res, next) => {
  const units = await UnitService.getAllUnits();

  return res.status(200).send(units);
};

exports.getUnit = async (req, res, next) => {
  const unit_id = req.body.unit_id;
  const unit = await UnitService.getUnit(unit_id);

  return res.status(200).send(unit);
};
