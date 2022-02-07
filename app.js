const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const usersRouter = require("./routes/api/users");
const contactsRouter = require("./routes/api/contacts");
const filesRouter = require("./routes/api/files");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/files", filesRouter);
app.use("/avatars", filesRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, next) => {
  const {
    status = 500,
    message = `Server error. ${err.message}. Please try again later`,
  } = err;

  res.status(status).json({
    message,
  });

  console.log(`\n${message}\n`);
});

module.exports = app;
