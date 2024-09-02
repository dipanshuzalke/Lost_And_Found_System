const Feedback = require("../models/feedbackModel.js");

module.exports.renderFeedbackForm = async (req, res) => {
  res.render("report/feedback.ejs");
};

module.exports.createFeedback = async (req, res) => {
  try {
    // Extract feedback details from the request body
    const { rating, comment, email } = req.body.feedback;

    // Create a new feedback instance
    const newFeedback = new Feedback({ 
      rating, 
      comment, 
      email,
      author: req.user._id // Associate feedback with the current user
    });

    // Save the feedback to the database
    await newFeedback.save();

    req.flash("success", "New Feedback Created");
    res.redirect("/feedback");
  } catch (error) {
    console.error("Error creating feedback:", error);
    req.flash("error", "Failed to create feedback.");
    res.redirect("/feedback");
  }
};
