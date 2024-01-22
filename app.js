const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const fs = require("node:fs");
const path = require("node:path");

const routes = require("./routes");

const app = express();

// add logger middleware
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
app.use(morgan("tiny", { stream: accessLogStream }));

// permission cors
app.use(cors());

// add routes to app
app.use("/api", routes);

app.use((error, res, next) => {
  res.status(404).json({ message: "Use api on routes: /api/contacts" });
});

app.use((error, req, res, next) => {
  const { status = 500, message = "Internal Server Error" } = error;
  res.status(status).json({ message });
});

module.exports = app;
