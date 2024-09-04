const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js");
const Report = require("../models/reportModel.js");
// const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");

const userController = require("../controllers/user.js");

router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

router.get("/logout", userController.logout);

router.get('/profile', isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // Get the user ID from the logged-in user
    if (!user) {
      req.flash('error', 'User not found.');
      return res.redirect('/report');
    }
    res.render("users/profile.ejs", { user }); // Render the profile view with user data
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/report');
  }
});

router.get("/index", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const totalReports = await Report.countDocuments({});
    res.render("report/index.ejs", { totalUsers: totalUsers, totalReports: totalReports });
  } catch (err) {
    res.status(500).send("Error retrieving user count");
  }
});

router.get("/memberInfo", async (req, res) => {
  const users = await User.find();
  res.render("users/members.ejs", { users });
});

module.exports = router;
