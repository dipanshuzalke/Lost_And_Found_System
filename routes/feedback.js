const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const { feedbackSchema } = require("../schema.js");
const Feedback = require("../models/feedbackModel.js");
const { isLoggedIn, validateFeedback, isFeedbackAuthor } = require("../middleware.js");


// Feedback Form
router.get(
  "/",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    res.render("report/feedback.ejs");
  })
);

//Submit feedback form
router.post(
  "/",
  isLoggedIn,
  isFeedbackAuthor,
  validateFeedback,
  wrapAsync(async (req, res) => {
    // Extract feedback details from the request body
    const { rating, comment, email } = req.body.feedback;

    // Create a new feedback instance
    const newFeedback = new Feedback({ rating, comment, email });
    newFeedback.author = req.user._id;

    // Save the feedback to the database
    await newFeedback.save();
    console.log(newFeedback);

    req.flash("success", "New Feedback Created");

    res.redirect("/feedback");
  })
);

module.exports = router;

