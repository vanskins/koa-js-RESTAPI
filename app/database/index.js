const mongoose = require("mongoose");

const initDB = () => {
  mongoose.connect("mongodb://localhost:27017/koajs");
  mongoose.connection.once("open", () => {
    console.log("connected to database");
  });

  mongoose.connection.on("error", console.error);
};

module.exports = initDB;
