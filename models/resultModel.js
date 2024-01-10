const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  rollNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
  },
  score: {
    type: Number,
  },
});

const Result = mongoose.model("results", resultSchema);

module.exports = Result;
