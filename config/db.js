const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log("MongoDB Connected")) // going to give us a promise
    .catch((error) => {
      console.error(error.message);
      process.exit(1);
    });
};

module.exports = connectDB;
