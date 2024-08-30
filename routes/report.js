const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reportSchema } = require("../schema.js");
const Report = require("../models/reportModel.js");
const { isLoggedIn } = require("../middleware.js");

// Validation for Schema
const validateReport = (req, res, next) => {
  let { error } = reportSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//Lost Items route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    let allReports = await Report.find({});
    res.render("report/report.ejs", { allReports });
  })
);

// Add new report route
router.get(
  "/new",
  wrapAsync(async (req, res) => {
    res.render("report/new.ejs");
  })
);

// Create report
router.post(
  "/",
  isLoggedIn,
  validateReport,
  wrapAsync(async (req, res) => {
    let newReport = new Report(req.body.report);
    await newReport.save();
    req.flash('success', 'New Report Created');
    res.redirect("/report");
  })
);

// Show report
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let report = await Report.findById(id);
    res.render("report/show.ejs", { report });
  })
);

// Edit report
router.get(
  "/:id/edit",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let report = await Report.findById(id);
    res.render("report/edit.ejs", { report });
  })
);

// Update report
router.put(
  "/:id",
  isLoggedIn,
  validateReport,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Report.findByIdAndUpdate(id, { ...req.body.report });
    req.flash("success", "Report Updated");
    res.redirect("/report");
  })
);

// Delete report
router.delete(
  "/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Report.findByIdAndDelete(id, { ...req.body.report });
    res.redirect("/report");
  })
);

module.exports = router;