const _ = require("lodash");
const { STATUS_CODES } = require("./constant.util");

const buildResponse = (code, status, message, response) => {
  if (!_.isNumber(code)) {
    throw new Error("Code must be a number");
  }

  if (!["S", "F"].includes(status)) {
    throw new Error("Status is invalid");
  }

  if (!message) {
    throw new Error("Message is empty");
  }

  if (!_.isObject(response)) {
    throw new Error("Response is invalid");
  }

  return { code, status, message, response };
};

const throwAPIError = (
  message = "Something went wrong",
  statusCode = STATUS_CODES.BAD_REQUEST,
  customCode = STATUS_CODES.BAD_REQUEST,
) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.customCode = customCode;
  error.level = "info";
  throw error;
};

const handleErrMsg = (error) => {
  return error?.level === "info" ? error.message : "Something went wrong";
};

const globalErrHandler = (error, req, res, next) => {
  const message = handleErrMsg(error);
  return res
    .status(error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR)
    .json(
      buildResponse(
        error?.customCode || STATUS_CODES.INTERNAL_SERVER_ERROR,
        "F",
        message,
        { message: error.message },
      ),
    );
};

module.exports = {
  buildResponse,
  throwAPIError,
  globalErrHandler,
};
