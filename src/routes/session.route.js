const express = require("express");
const { refreshAccessToken } = require("../controller/token.controller");
const router = express.Router();

router.post("/v1/refresh-token", refreshAccessToken);

module.exports = router;
