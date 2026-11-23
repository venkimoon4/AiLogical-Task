const Accounts = require("../models/accounts");

class AccountService {
  constructor() {}

  async createAccount(data, options = {}) {
    return await Accounts.create(data, options);
  }

  async findAccount(id) {
    return await Accounts.findOne({ where: { id }, raw: true });
  }
}

const AccountServices = new AccountService();

module.exports = AccountServices;
