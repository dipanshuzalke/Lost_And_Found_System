const Report = require("./models/reportModel.js");
const Feedback = require("./models/feedbackModel.js");
const ExpressError = require("./utils/ExpressError.js");
const { reportSchema, feedbackSchema } = require("./schema.js");

//Connecting Login Route
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
      const route = req.originalUrl;
      if (route.includes("/report")) {
          req.flash("error", "You must be logged in to create a new report!");
      } else if (route.includes("/feedback")) {
          req.flash("error", "You must be logged in to submit feedback!");
      } else {
          req.flash("error", "You must be logged in to access this page!");
      }
      return res.redirect("/login");
  }
  next();
};


//post-login Page
module.exports.saveRedirectUrl = (req, res, next) => {
  if(req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

//Authorization for Report
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let report = await Report.findById(id);
  if(!report.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the owner of this report");
    return res.redirect(`/report/${id}`);
  }
  next();
};

// Validation for Report Schema
module.exports.validateReport = (req, res, next) => {
  let { error } = reportSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//Validation for Feedback Schema 
module.exports.validateFeedback = (req, res, next) => {
  let { error } = feedbackSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};



