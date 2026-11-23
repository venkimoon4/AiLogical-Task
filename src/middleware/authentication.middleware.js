const AuthenticationServices = require("../services/authentication.service");
const { responseMessages } = require("../utils/constant.util");
const { throwAPIError } = require("../utils/response.util");
const { handleAsync } = require("./async-handler.middleware");

const authorizeAccess = handleAsync(async (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];

  if (!token) {
    throwAPIError(responseMessages.fieldIsRequired("Token"));
  }

  req.account = AuthenticationServices.verifyAccessToken(token);

  next();
});

module.exports = {
  authorizeAccess,
};
