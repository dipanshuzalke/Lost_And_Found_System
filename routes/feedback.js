const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const { feedbackSchema } = require("../schema.js");
// const Feedback = require("../models/feedbackModel.js");
const {
  isLoggedIn,
  validateFeedback,
} = require("../middleware.js");

const feedbackController = require("../controllers/feedback.js");

router
  .route("/")
  .get(isLoggedIn, wrapAsync(feedbackController.renderFeedbackForm))
  .post(
    isLoggedIn,
    validateFeedback,
    wrapAsync(feedbackController.createFeedback)
  );

module.exports = router;
