const { AUTH_SECRET } = require("../../config/env");
const jwt = require("jsonwebtoken");

class AuthenticationService {
  constructor() {
    this.key = AUTH_SECRET;
  }

  generateAccessToken(data) {
    return jwt.sign(data, this.key, {
      expiresIn: "45m",
    });
  }

  verifyAccessToken(token) {
    return jwt.verify(token, this.key);
  }
}

const AuthenticationServices = new AuthenticationService();

module.exports = AuthenticationServices;
