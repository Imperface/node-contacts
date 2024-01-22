const mongoose = require("mongoose");
const app = require("./app");

const config = require("dotenv");

config.config();

const { DB_URI, PORT = 3000 } = process.env;
const connection = mongoose.connect(DB_URI);

connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
