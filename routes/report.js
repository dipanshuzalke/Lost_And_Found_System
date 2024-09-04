const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const { reportSchema } = require("../schema.js");
const Report = require("../models/reportModel.js");
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
  // .post(upload.single("report[image]"), (req, res) => {
  //   console.log(req.body); // Log the body to check for 'report.image'
  //   console.log(req.file);  // If using Multer, check the file
  //   if (!req.body['report[image]'] && !req.file) {
  //   return res.status(400).send('Image file is required.');
  // }
  //   res.send(req.file.url);
  // });

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

// router.get("/report/lost", async (req, res) => {
//   try {
//     const allLostItems = await Report.find({ "status": "lost" });
//     console.log(allLostItems);
//     res.render("report/lostItems.ejs", { allLostItems });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("An error occurred while retrieving lost items.");
//   }
// });

router.get("/report/lost/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID format");
  }

  const lostItem = await Report.findById(id);
  res.render("report/lostItems.ejs", { lostItem });
});


router.get("/report/lost", async (req, res) => {
  const allLostItems = await Report.find({ status : "Lost" });
  console.log(allLostItems);
  res.render("report/lostItems.ejs", { allLostItems });
});

module.exports = router;
