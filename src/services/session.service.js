const { Op } = require("sequelize");
const Sessions = require("../models/sessions");
const {
  generateTokenId,
  generateRefreshToken,
  tokenToHash,
  compareTokenToHash,
} = require("../utils/session.util");
const moment = require("moment-timezone");
const { throwAPIError } = require("../utils/response.util");
const { responseMessages } = require("../utils/constant.util");
const AuthenticationServices = require("./authentication.service");
const AccountServices = require("../services/account.service");

class SessionService {
  constructor() {}

  async createSession(accountId) {
    try {
      const tokenId = generateTokenId();
      const refreshToken = generateRefreshToken();
      const tokenHash = tokenToHash(refreshToken);
      const customToken = `${tokenId}:${refreshToken}`;
      const expiryAt = moment().add(7, "days").toDate();

      await Sessions.destroy({ where: { accountId } });

      await Sessions.create({ accountId, tokenId, tokenHash, expiryAt });

      return customToken;
    } catch (error) {
      throw error;
    }
  }

  async validateAndGenerateAccessToken(tokenId, refreshToken) {
    try {
      console.log(tokenId, refreshToken);

      const findSession = await Sessions.findOne({
        where: {
          tokenId,
          expiryAt: {
            [Op.gt]: new Date(),
          },
        },
        attributes: ["accountId", "tokenHash"],
        raw: true,
        nest: true,
      });

      if (!findSession) {
        throwAPIError(responseMessages.fieldIsInvalid("Session id"));
      }

      const findAccount = await AccountServices.findAccount(
        findSession?.accountId,
      );

      const account = {
        id: findAccount.id,
        firstName: findAccount.firstName,
        lastName: findAccount.lastName,
        email: findAccount.email,
        mobileNumber: findAccount.mobileNumber,
      };

      if (!compareTokenToHash(refreshToken, findSession?.tokenHash)) {
        throwAPIError(responseMessages.fieldIsInvalid("Refresh token"));
      }

      return AuthenticationServices.generateAccessToken(account);
    } catch (error) {
      throw error;
    }
  }
}

const SessionServices = new SessionService();

module.exports = SessionServices;
