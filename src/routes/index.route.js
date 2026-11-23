const express = require("express");
const router = express.Router();
const accountRouter = require("./account.route");
const sessionRouter = require("./session.route");

router.use("/account", accountRouter);

router.use("/session", sessionRouter);

module.exports = router;
