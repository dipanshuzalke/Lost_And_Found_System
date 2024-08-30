const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js");
// const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
// const { saveRedirectUrl } = require("../middleware.js");

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post("/signup", async (req, res) => {
  let {
    fullName,
    department,
    semester,
    section,
    contact,
    email,
    username,
    password,
  } = req.body;
  const newUser = new User({
    fullName,
    department,
    semester,
    section,
    contact,
    email,
    username,
  });
  const registeredUser = await User.register(newUser, password);
  console.log(registeredUser);
  res.redirect("/signup");
});

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    res.send("logged In");
  }
);

module.exports = router;
