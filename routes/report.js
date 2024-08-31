const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const { reportSchema } = require("../schema.js");
const Report = require("../models/reportModel.js");
const { isLoggedIn, isOwner, validateReport } = require("../middleware.js");

//Lost Items route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    let allReports = await Report.find({});
    res.render("report/report.ejs", { allReports });
  })
);

// Add new report route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("report/new.ejs");
});

// Create report
router.post(
  "/",
  isLoggedIn,
  validateReport,
  wrapAsync(async (req, res) => {
    const newReport = new Report(req.body.report);
    newReport.owner = req.user._id;
    await newReport.save();
    req.flash("success", "Your report has been created!");
    res.redirect("/report");
  })
);

// Show report
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let report = await Report.findById(id).populate("owner");
    res.render("report/show.ejs", { report });
  })
);

// Edit report
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const report = await Report.findById(id);
    if (!report) {
      req.flash("error", "Report you requested for does not exist!");
      res.redirect("/report");
    }
    res.render("report/edit.ejs", { report });
  })
);

// Update report
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateReport,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Report.findByIdAndUpdate(id, { ...req.body.report });
    req.flash("success", "Report Updated");
    res.redirect(`/report/${id}`);
  })
);

// Delete report
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Report.findByIdAndDelete(id, { ...req.body.report });
    req.flash("success", "Report Deleted");
    res.redirect("/report");
  })
);

module.exports = router;
