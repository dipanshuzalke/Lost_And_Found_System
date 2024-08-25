const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const Report = require("./models/reportModel.js");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { reportSchema } = require("./schema.js");
// const upload = require("./config/multerconfig.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

const connectWithRetry = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/lost&found", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
      console.error("MongoDB connection failed, retrying in 5 seconds...", err);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

// Validation for Schema
const validateListing = (req, res, next) => {
  let { error } = reportSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Root route
app.get(
  "/",
  wrapAsync(async (req, res) => {
    res.render("report/index.ejs");
  })
);

//Lost Items route
app.get(
  "/report",
  wrapAsync(async (req, res) => {
    let allReports = await Report.find({});
    res.render("report/report.ejs", { allReports });
  })
);

// Add new report route
app.get(
  "/report/new",
  wrapAsync(async (req, res) => {
    res.render("report/new.ejs");
  })
);

// Create report
app.post(
  "/report",
  validateListing,
  wrapAsync(async (req, res) => {
    let newReport = new Report(req.body.report);
    await newReport.save();
    res.redirect("/report");
  })
);

// Show report
app.get(
  "/report/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let report = await Report.findById(id);
    res.render("report/show.ejs", { report });
  })
);

// Edit report
app.get(
  "/report/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let report = await Report.findById(id);
    res.render("report/edit.ejs", { report });
  })
);

// Update report
app.put(
  "/report/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Report.findByIdAndUpdate(id, { ...req.body.report });
    res.redirect("/report");
  })
);

// Delete report
app.delete(
  "/report/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Report.findByIdAndDelete(id, { ...req.body.report });
    res.redirect("/report");
  })
);

// Returned report route
app.get(
  "/returnedItems",
  wrapAsync(async (req, res) => {
    res.render("report/returned_report.ejs");
  })
);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

// Error Handling
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
