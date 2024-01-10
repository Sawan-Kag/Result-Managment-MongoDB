const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const teacherSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

teacherSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password") || this.isNew) {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Teacher = mongoose.model("teachers", teacherSchema);

module.exports = Teacher;
