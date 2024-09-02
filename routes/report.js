const express = require("express");
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
  // .post(
  //   isLoggedIn,
  //   upload.single("report[image]"),
  //   validateReport,
  //   wrapAsync(reportController.createReport)
  // );
  .post(upload.single("report[image]"), (req, res) => {
    console.log(req.body); // Log the body to check for 'report.image'
    console.log(req.file);  // If using Multer, check the file
    if (!req.body['report[image]'] && !req.file) {
    return res.status(400).send('Image file is required.');
  }
    res.send(req.file.url);
  });

// Add new report route
router.get("/new", isLoggedIn, reportController.renderReportForm);

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

// Edit report
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(reportController.editReport)
);

module.exports = router;
