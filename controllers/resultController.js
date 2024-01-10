const db = require("../models");

const Result = db.Result;

const addResult = async (req, res) => {
  try {
    const result = await Result.create(req.body);
    res.status(200).send("/teacher");
  } catch (error) {
    console.error("Error adding result:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllResults = async (req, res) => {
  try {
    let results = await Result.find({});
    res.render("./teacher/teacherHome", { title: "Teacher Home", results });
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).send("Internal Server Error");
  }
};

const viewResult = async (req, res) => {
  let rollNumber = req.params.rollNumber;
  let result = await Result.findOne({ rollNumber: rollNumber }).exec();
  res.render("./student/studentresult", { title: "Result ", result });
};

const getOneResults = async (req, res) => {
  let rollNumber = req.params.rollNumber;
  let result = await Result.findOne({ rollNumber: rollNumber }).exec();
  res.render("./teacher/editStudent", { title: "Edit Student", result });
};

const getStuResult = async (req, res) => {
  let rollNumber = req.body.rollNumber;
  let dateOfBirth = req.body.dob;
  let result = await Result.findOne({ rollNumber: rollNumber, dateOfBirth: dateOfBirth }).exec();
  if (result != null) {
    res.status(200).send(rollNumber);
  } else {
    res.status(200).send(false);
  }
};

const updateResults = async (req, res) => {
  const rollNumber = req.params.rollNumber;
  let result = await Result.updateOne({ rollNumber: rollNumber }, req.body).exec();
  res.redirect("/teacher");
};

const deleteResults = async (req, res) => {
  let rollNumber = req.params.rollNumber;
  await Result.deleteOne({ rollNumber: rollNumber }).exec();
  res.status(200).send("/teacher");
};

const checkResut = async (req, res) => {
  let rollNumber = req.params.rollNumber;
  let result = await Result.findOne({ rollNumber: rollNumber }).exec();
  if (result != null) {
    res.status(200).send(true);
  } else {
    res.status(200).send(false);
  }
};

module.exports = {
  addResult,
  getAllResults,
  getOneResults,
  updateResults,
  deleteResults,
  checkResut,
  viewResult,
  getStuResult,
};
