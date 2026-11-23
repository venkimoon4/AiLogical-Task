const express = require("express");
const app = express();
const db = require("../config/db");
const cors = require("cors");
const morgan = require("morgan");
const { PORT } = require("../config/env");
const { globalErrHandler } = require("./utils/response.util");
const apiRoutes = require("./routes/index.route");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api", apiRoutes);

app.use(globalErrHandler);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
