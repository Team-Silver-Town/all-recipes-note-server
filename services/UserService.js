const User = require("../models/User");

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async findUser(query) {
    return await this.userModel.findOne(query);
  }

  async createUser({ nickname, email, picture }) {
    return await this.userModel.create({ nickname, email, picture });
  }

  async updateUser({ nickname, email }) {
    return await this.userModel.findOneAndUpdate({ email }, { nickname });
  }
}

module.exports = new UserService(User);
