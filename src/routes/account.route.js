const express = require("express");
const {
  createAccount,
  fetchProfileDetails,
  loginAccount,
} = require("../controller/account.controller");
const { authorizeAccess } = require("../middleware/authentication.middleware");
const { loginRateLimiter } = require("../middleware/rate-limiter.middleware");
const router = express.Router();

router.post("/v1/create-account", createAccount);

router.post("/v1/login-account", loginRateLimiter, loginAccount);

router.get("/v1/fetch-profile-details", authorizeAccess, fetchProfileDetails);

module.exports = router;
