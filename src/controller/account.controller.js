const { handleAsync } = require("../middleware/async-handler.middleware");
const Accounts = require("../models/accounts");
const AccountServices = require("../services/account.service");
const SessionServices = require("../services/session.service");
const { responseMessages, STATUS_CODES } = require("../utils/constant.util");
const { throwAPIError, buildResponse } = require("../utils/response.util");
const { tokenToHash, compareTokenToHash } = require("../utils/session.util");

const createAccount = handleAsync(async (req, res) => {
  let { firstName, lastName, email, mobileNumber, password } = req.body;

  if (!firstName) {
    throwAPIError(responseMessages.fieldIsRequired("First name"));
  }

  if (!lastName) {
    throwAPIError(responseMessages.fieldIsRequired("Last name"));
  }

  if (!email) {
    throwAPIError(responseMessages.fieldIsRequired("Email"));
  }

  email = email.toLowerCase();

  if (!mobileNumber) {
    throwAPIError(responseMessages.fieldIsRequired("Mobile number"));
  }

  if (mobileNumber.length !== 10) {
    throwAPIError(responseMessages.fieldIsInvalid("Mobile number"));
  }

  if (!password) {
    throwAPIError(responseMessages.fieldIsRequired("Password"));
  }

  try {
    await AccountServices.createAccount({
      firstName,
      lastName,
      email,
      mobileNumber,
      password: tokenToHash(password),
    });
  } catch (error) {
    throwAPIError(error.message);
  }

  return res.status(STATUS_CODES.CREATED).json(
    buildResponse(STATUS_CODES.CREATED, "S", "Account created successfully", {
      message: "Account created successfully",
    }),
  );
});

const fetchProfileDetails = handleAsync(async (req, res) => {
  return res.status(STATUS_CODES.OK).json(
    buildResponse(
      STATUS_CODES.OK,
      "S",
      "Account details fetched successfully",
      {
        ...req.account,
      },
    ),
  );
});

const loginAccount = handleAsync(async (req, res) => {
  let { email, password } = req.body;

  if (!email) {
    throwAPIError(responseMessages.fieldIsRequired("Email"));
  }

  email = email.toLowerCase();

  if (!password) {
    throwAPIError(responseMessages.fieldIsRequired("Password"));
  }

  const findAccount = await Accounts.findOne({ where: { email } });

  if (!findAccount) {
    throwAPIError(
      responseMessages.fieldNotFound("Account"),
      STATUS_CODES.NOT_FOUND,
      STATUS_CODES.NOT_FOUND,
    );
  }

  const isMatched = compareTokenToHash(password, findAccount.password);

  if (!isMatched) {
    throwAPIError(responseMessages.fieldIsInvalid("Password"));
  }

  const customToken = await SessionServices.createSession(findAccount.id);

  return res.status(STATUS_CODES.OK).json(
    buildResponse(STATUS_CODES.OK, "S", "Login successfully", {
      customToken,
    }),
  );
});

module.exports = {
  createAccount,
  fetchProfileDetails,
  loginAccount,
};
