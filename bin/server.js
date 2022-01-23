const mongoose = require("mongoose");
const app = require("../app");
require("dotenv").config();

const { DB_HOST, PORT = 4000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log(
        `\nDatabase connection successful\nServer running. Use our API on port: ${PORT}\n`
      );
    })
  )
  .catch((error) => {
    console.log(`\n${error.message}\n`);
    process.exit(1);
  });
