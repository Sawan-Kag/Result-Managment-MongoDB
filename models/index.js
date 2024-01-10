require("dotenv").config();
const mongoose = require("mongoose");
const Result = require("./resultModel");
const Teacher = require("./teacherModel");

const mongoURI = process.env.MONGODB_URL;

mongoose
  .connect(mongoURI, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log("Connected to MongoDB using Mongoose");
  })
  .catch((err) => {
    console.error("Error while connecting to MongoDB using Mongoose:", err);
  });
module.exports = {
  db: mongoose.connection,
  Result,
  Teacher,
};
