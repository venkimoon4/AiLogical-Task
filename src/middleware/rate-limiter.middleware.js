const rateLimiter = require("express-rate-limit");

const loginRateLimiter = rateLimiter({
  windowMs: 1 * 60 * 1000,
  limit: 5,
  message: {
    message: "Too many login attempts, please try again in 15 minutes.",
  },
});

module.exports = {
  loginRateLimiter,
};
