const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const wrapAsync = require("./utils/wrapAsync.js");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
// const upload = require("./config/multerconfig.js");

const reports = require("./routes/report.js");
const feedbacks = require("./routes/feedback.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

const MONGO_URL = "mongodb://127.0.0.1:27017/lost&found";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// Root route
app.get(
  "/",
  wrapAsync(async (req, res) => {
    res.render("report/index.ejs");
  })
);

app.use("/report", reports);
app.use("/feedback", feedbacks);


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
