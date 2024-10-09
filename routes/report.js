const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const { reportSchema } = require("../schema.js");
// const Report = require("../models/reportModel.js");
const { isLoggedIn, isOwner, validateReport } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const reportController = require("../controllers/report.js");

router
  .route("/")
  //Index route
  .get(wrapAsync(reportController.index))
  //Create route
  .post(
    isLoggedIn,
    upload.single("report[image]"),
    validateReport,
    wrapAsync(reportController.createReport)
  );

// Add new report route
router.get("/new", isLoggedIn, reportController.renderReportForm);

router.get('/myReports', isLoggedIn, reportController.getUserReports);

router.get('/myReports/:id',   // Show user report
reportController.showUserReport)

// Edit report
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(reportController.editReport)
);

//Lost Items
router.get("/lost/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID format");
  }

  const lostItem = await Report.findById(id);
  res.render("report/lostItems.ejs", { lostItem });
});

router.get("/lost", async (req, res) => {
  const allLostItems = await Report.find({ status: "Lost" });
  res.render("report/lostItems.ejs", { allLostItems });
});

//Found Items 
router.get("/found/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID format");
  }

  const foundItem = await Report.findById(id);
  res.render("report/foundItems.ejs", { foundItem });
});

router.get("/found", async (req, res) => {
  const allFoundItems = await Report.find({ status: "Found" });
  res.render("report/foundItems.ejs", { allFoundItems });
});

router
  .route("/:id")
  //Show route
  .get(wrapAsync(reportController.showReport))
  //Update route
  .put(
    isLoggedIn,
    isOwner,
    upload.single("report[image]"),
    validateReport,
    wrapAsync(reportController.updateReport)
  )
  //Edit route
  .delete(isLoggedIn, isOwner, wrapAsync(reportController.destroyReport));

module.exports = router;
