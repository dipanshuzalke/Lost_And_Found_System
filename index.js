if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// console.log(process.env);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const wrapAsync = require("./utils/wrapAsync.js");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/userModel.js");


const reportRouter = require("./routes/report.js");
const feedbackRouter = require("./routes/feedback.js");
const userRouter = require("./routes/user.js");
const returnReportRouter = require("./routes/returnReport.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/minorProject";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, //milliseconds in 7 days
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  // console.log(res.locals.success);
  res.locals.error = req.flash("error");
  // console.log("Current User:", req.user);
  res.locals.currUser = req.user;
  next();
});

app.use("/report", reportRouter);
app.use("/feedback", feedbackRouter);
app.use("/", userRouter);
app.use("/report", returnReportRouter);


app.get("/", (req, res) => {
  res.render("homepage.ejs");
});

// Root route
app.get("/index", (req, res) => {
  res.render("report/index.ejs");
});

// Returned report route
app.get(
  "/returnedItems",
  wrapAsync(async (req, res) => {
    res.render("report/returned_report.ejs");
  })
);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

// Error Handling
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
