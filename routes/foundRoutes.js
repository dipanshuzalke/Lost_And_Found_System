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

const foundController = require("../controllers/report.js");

router
  .route("/")
  //Index route
  .get(wrapAsync(foundController.foundItems))
//   //Create route
//   .post(
//     isLoggedIn,
//     upload.single("report[image]"),
//     validateReport,
//     wrapAsync(foundController.createReport)
//   );

// Edit report
router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(foundController.editFoundItem)
  );

router
  .route("/:id")
  //Show route
  .get(wrapAsync(foundController.showFoundItem))
  //Update route
  .put(
    isLoggedIn,
    isOwner,
    upload.single("report[image]"),
    validateReport,
    wrapAsync(foundController.updateFoundItem)
  )
  //Edit route
  .delete(isLoggedIn, isOwner, wrapAsync(foundController.destroyFoundItem));

module.exports = router;