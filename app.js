require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

const db = require("./models");

const Teacher = db.Teacher;
const indexRouter = require("./routes/index");
const teacherRouter = require("./routes/teacher");
const studentRouter = require("./routes/student");

// Use middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

// Set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Express session setup
app.use(
  expressSession({
    secret: "secret-code",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
  })
);

// Render login page
app.get("/login", function (req, res, next) {
  res.render("./login", { title: "Teacher Login", message: null });
});

// Check user session middleware
var checkUser = function (req, res, next) {
  const userName = req.body.userName;
  const password = req.body.password;
  if (req.session.loggedIn) {
    next();
  } else {
    if (userName != undefined && password != undefined) {
      const teacher = Teacher.findOne({
        userName: userName,
        password: password,
      }).then((result) => {
        if (result != null) {
          req.session.loggedIn = true;
          res.status(200).send("/teacher");
        } else {
          res.status(200).send(false);
        }
      });
    } else {
      res.render("./login", {
        title: "Login as",
        message: "Please Login First ",
      });
    }
  }
};

// Logout endpoint
app.get("/logout", (req, res) => {
  req.session.loggedIn = false;
  res.header("Cache-Control", "no-cache", "no-store", "must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  req.session.destroy();

  res.redirect("/");
});

// Use routers
app.use("/", indexRouter);
app.use("/teacher", checkUser, teacherRouter);
app.use("/student", studentRouter);

// 404 handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = "Page " + err.message + " At " + req.url;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(`Result Management app listening on port ${port}`);
});
