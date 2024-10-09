const Report = require("../models/reportModel.js");

module.exports.index = async (req, res) => {
  let allReports = await Report.find({});
  const lostReports = allReports.filter(report => report.status === 'lost');
const foundReports = allReports.filter(report => report.status === 'found');
  // console.log(allReports);
  res.render("report/report.ejs", { allReports, lostReports, foundReports, 
    foundReportQuestion: 'Please describe the item you found:',
    lostReportQuestion: 'Please describe the item you lost:',
 });
};

module.exports.renderReportForm = (req, res) => {
  res.render("report/new.ejs");
};

module.exports.createReport = async (req, res) => {
  try {
    // Check if image file is uploaded
    if (!req.body['report[image]'] && !req.file) {
      return res.status(400).send('Image file is required.');
    }

    // Get the file URL and filename
    let url = req.file.path;
    let filename = req.file.filename;

    // Create a new report
    const newReport = new Report(req.body.report);

    // Assign owner and image to the new report
    newReport.owner = req.user._id;
    newReport.image = { url, filename };

    // Save the report type (Lost or Found)
    // const reportType = req.body.status;  // Default to 'Lost' if no type is provided
    // newReport.type = reportType;

    // Save the new report to the database
    await newReport.save();

    // Flash success message
    req.flash("success", "Your report has been created!");

    // Redirect to the appropriate route based on the report type
    // if (reportType === 'Lost') {
    //   res.redirect("/report/lost");  // Redirect to lost reports
    // } else if (reportType === 'Found') {
    //   res.redirect("/report/found"); // Redirect to found reports
    // } else {
      res.redirect("/report");  // Default redirection
    // }
  } catch (error) {
    // Flash error message
    req.flash("error", "There was an issue creating your report.");
    
    // Redirect to the report creation form
    res.redirect("/report/new");
  }
};

module.exports.getUserReports = async (req, res) => {
  try {
    const reports = await Report.find({ owner: req.user._id });
    // console.log(reports);
    res.render('report/userReports.ejs', { reports });
  } catch (error) {
    res.status(500).send('Error in user report');
  }
};

module.exports.showUserReport = async (req, res) => {
  let { id } = req.params;
  let report = await Report.findById(id);
  res.render("report/showUserReport.ejs", { report });
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
