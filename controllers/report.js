const Report = require("../models/reportModel.js");

module.exports.index = async (req, res) => {
  let allReports = await Report.find({});
  // console.log(allReports);
  res.render("report/report.ejs", { allReports });
};

module.exports.renderReportForm = (req, res) => {
  res.render("report/new.ejs");
};

module.exports.createReport = async (req, res) => {
  try {
    if (!req.body['report[image]'] && !req.file) {
      return res.status(400).send('Image file is required.');
    }
    let url = req.file.path;
    let filename = req.file.filename;
    const newReport = new Report(req.body.report);
    newReport.owner = req.user._id;
    newReport.image = { url, filename };
    await newReport.save();
    req.flash("success", "Your report has been created!");
    res.redirect("/report");
  } catch (error) {
    req.flash("error", "There was an issue creating your report.");
    res.redirect("/report/new");
  }
};

module.exports.showReport = async (req, res) => {
  let { id } = req.params;
  let report = await Report.findById(id).populate("owner");
  res.render("report/show.ejs", { report });
};

module.exports.editReport = async (req, res) => {
  let { id } = req.params;
  const report = await Report.findById(id);
  if (!report) {
    req.flash("error", "Report you requested for does not exist!");
    res.redirect("/report");
  }
  res.render("report/edit.ejs", { report });
};

module.exports.updateReport = async (req, res) => {
  let { id } = req.params;
  await Report.findByIdAndUpdate(id, { ...req.body.report });
  req.flash("success", "Report Updated");
  res.redirect(`/report/${id}`);
};

module.exports.destroyReport = async (req, res) => {
  let { id } = req.params;
  await Report.findByIdAndDelete(id, { ...req.body.report });
  req.flash("success", "Report Deleted");
  res.redirect("/report");
};
