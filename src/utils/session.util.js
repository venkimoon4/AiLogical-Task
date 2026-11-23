const crypto = require("crypto");

const generateTokenId = () => {
  return crypto.randomBytes(16).toString("hex");
};

const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

const compareTokenToHash = (token, hash) => {
  return crypto.createHash("sha256").update(token).digest("hex") === hash;
};

const tokenToHash = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

module.exports = {
  generateTokenId,
  generateRefreshToken,
  compareTokenToHash,
  tokenToHash,
};
