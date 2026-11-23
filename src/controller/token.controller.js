const { handleAsync } = require("../middleware/async-handler.middleware");
const SessionServices = require("../services/session.service");
const { STATUS_CODES } = require("../utils/constant.util");
const { buildResponse } = require("../utils/response.util");

const refreshAccessToken = handleAsync(async (req, res) => {
  const [tokenId, refreshToken] = req?.headers?.customtoken?.split(":") || "";

  const accessToken = await SessionServices.validateAndGenerateAccessToken(
    tokenId,
    refreshToken,
  );

  return res.status(STATUS_CODES.OK).json(
    buildResponse(STATUS_CODES.OK, "S", "Token Refreshed successfully", {
      accessToken,
    }),
  );
});

module.exports = {
  refreshAccessToken,
};
