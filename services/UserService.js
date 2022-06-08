const User = require("../models/User");

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async findUser(query) {
    return await this.userModel.findOne(query).lean();
  }

  async createUser(query) {
    return await this.userModel.create(query);
  }
}

module.exports = new UserService(User);
