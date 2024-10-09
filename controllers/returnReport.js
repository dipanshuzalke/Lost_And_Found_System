// Assuming you have already set up your returnReport model
const returnReport = require('../models/returnReportModel');

// Route for handling 'found' report
module.exports.foundResponse = async (req, res) => {
  try {
    const { description } = req.body;

    const report = new returnReport({
      type: 'found',
      question: description,
      userId: req.user._id // Assuming user is logged in
    });
    console.log(report);
    
    await report.save();
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving found report:', error);
    res.json({ success: false });
  }
};

// Route for handling 'lost' report
module.exports.lostResponse = async (req, res) => {
  try {
    const { description, location } = req.body;

    const report = new returnReport({
      type: 'lost',
      question: description,
      location,
      userId: req.user._id // Assuming user is logged in
    });
    console.log(report);

    await report.save();
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving lost report:', error);
    res.json({ success: false });
  }
};

// Controller to get all user responses
module.exports.getUserResponse = async (req, res) => {
  try {
    // Ensure user is logged in
    if (!req.user || !req.user._id) {
      req.flash('error', 'User not found.');
      return res.redirect('/login'); // Redirect to login if no user found
    }

    // Find all reports created by the logged-in user
    const userReports = await returnReport.find({ userId: req.user._id });
    // console.log(req.user._id );
    

    // Render the myResponses page, passing in the user's reports
    res.render('report/userResponse.ejs', { userReports });
  } catch (error) {
    console.error('Error fetching user reports:', error);
    req.flash('error', 'An error occurred while fetching your reports.');
    res.redirect('/'); // Redirect to a safe route if an error occurs
  }
};

// Route for fetching individual reports by ID (make sure this is not conflicting)
module.exports.showUserResponse = async (req, res) => {
  const report = await returnReport.findById(req.params.id);
  if (!report) {
      req.flash('error', 'Report not found.');
      return res.redirect('/');
  }
  res.render('report/showUserReport.ejs', { report });
};






