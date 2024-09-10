const Report = require("../models/reportModel.js");

module.exports.lostItems = async (req, res) => {
    const allLostItems = await Report.find({ status: "Lost" });
    res.render("report/lostItems.ejs", { allLostItems });
};

module.exports.showLostItem = async (req, res) => {
    const { id } = req.params;
    const lostItem = await Report.findById(id).populate("owner");
    res.render("report/ShowLostItem.ejs", { lostItem });
};

module.exports.editLostItem = async (req, res) => {
  let { id } = req.params;
  const report = await Report.findById(id);
  if (!report) {
    req.flash("error", "Report you requested for does not exist!");
    res.redirect("/report/found");
  }
  res.render("report/EditLostItem.ejs", { report });
};

module.exports.updateLostItem = async (req, res) => {
  let { id } = req.params;
  await Report.findByIdAndUpdate(id, { ...req.body.report });
  req.flash("success", "Report Updated");
  res.redirect(`/report/lost/${id}`);
};

module.exports.destroyLostItem = async (req, res) => {
  let { id } = req.params;
  await Report.findByIdAndDelete(id, { ...req.body.report });
  req.flash("success", "Report Deleted");
  res.redirect("/report/lost");
};
