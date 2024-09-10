const Report = require("../models/reportModel.js");

module.exports.foundItems = async (req, res) => {
    const allFoundItems = await Report.find({ status: "Found" });
    res.render("report/foundItems.ejs", { allFoundItems });
};

module.exports.showFoundItem = async (req, res) => {
    const { id } = req.params;
    const foundItem = await Report.findById(id).populate("owner");
    res.render("report/ShowFoundItem.ejs", { foundItem });
};

module.exports.editFoundItem = async (req, res) => {
  let { id } = req.params;
  const report = await Report.findById(id);
  if (!report) {
    req.flash("error", "Report you requested for does not exist!");
    res.redirect("/report/found");
  }
  res.render("report/EditFoundItem.ejs", { report });
};

module.exports.updateFoundItem = async (req, res) => {
  let { id } = req.params;
  await Report.findByIdAndUpdate(id, { ...req.body.report });
  req.flash("success", "Report Updated");
  res.redirect(`/report/found/${id}`);
};

module.exports.destroyFoundItem = async (req, res) => {
  let { id } = req.params;
  await Report.findByIdAndDelete(id, { ...req.body.report });
  req.flash("success", "Report Deleted");
  res.redirect("/report/found");
};
