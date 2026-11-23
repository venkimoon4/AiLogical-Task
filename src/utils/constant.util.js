const STATUS_CODES = {
  OK: 200,
  CREATED:201,
  ACCEPTED: 202,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  TOO_MANY_REQUEST: 429,

  INTERNAL_SERVER_ERROR: 500,
};

const responseMessages = {
  fieldIsRequired: (field) => `${field} is required`,
  fieldIsMissing: (field) => `${field} is missing`,
  fieldIsInvalid: (field) => `${field} is invalid`,
  fieldNotFound: (field) => `${field} not found`,
};

module.exports = {
  STATUS_CODES,
  responseMessages,
};
