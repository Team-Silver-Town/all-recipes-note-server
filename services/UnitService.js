const Unit = require("../models/Unit");

class UnitService {
  constructor(unitModel) {
    this.unitModel = unitModel;
  }

  async getAllUnits() {
    const units = await this.unitModel.find().lean();

    return units;
  }

  async getUnit(unit_id) {
    const unit = await this.unitModel.findById(unit_id).lean();

    return unit;
  }
}

module.exports = new UnitService(Unit);
