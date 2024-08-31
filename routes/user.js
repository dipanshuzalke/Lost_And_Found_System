const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js");
// const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
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

      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Thanks for joining Lost and Found!");
        res.redirect("/report");
      });
    } catch (err) {
      res.flash("error", err.message);
      res.redirect("/signup");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Happy to see you back at Lost and Found!");
    let redirectUrl = res.locals.redirectUrl || "/report";
    res.redirect(redirectUrl);
  }
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged out successfully!");
    res.redirect("/report");
  });
});

module.exports = router;
