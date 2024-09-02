const User = require("../models/userModel.js");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
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
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Happy to see you back at Lost and Found!");
  let redirectUrl = res.locals.redirectUrl || "/report";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged out successfully!");
    res.redirect("/report");
  });
};
