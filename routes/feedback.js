const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { feedbackSchema } = require("../schema.js");
const Feedback = require("../models/feedbackModel.js");

const validateFeedback = (req, res, next) => {
  console.log(req.body);
  let { error } = feedbackSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Feedback Form
router.get(
  "/",
  wrapAsync(async (req, res) => {
    let allFeedbacks = await Feedback.find({});
    res.render("report/feedback.ejs", { allFeedbacks });
  })
);

//Submit feedback form
router.post(
  "/",
  validateFeedback,
  wrapAsync(async (req, res) => {
    // Extract feedback details from the request body
    const { rating, comment, email } = req.body.feedback;

    // Create a new feedback instance
    const newFeedback = new Feedback({ rating, comment, email });

    // Save the feedback to the database
    await newFeedback.save();
    console.log(newFeedback);

    res.redirect("/feedback");
  })
);

module.exports = router;

