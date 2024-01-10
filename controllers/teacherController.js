const teacherLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await Teacher.findOne({ userName, password });

    if (user) {
      const authToken = generateAuthToken();
      authTokens[authToken] = userName;
      res.cookie("AuthToken", authToken);
      res.status(200).send("/teacher");
    } else {
      res.status(200).send(false);
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  teacherLogin,
};
