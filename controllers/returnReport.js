// Assuming you have already set up your returnReport model
const returnReport = require('../models/returnReportModel');

// Route for handling 'found' report
module.exports.foundResponse = async (req, res) => {
  try {
    const { question } = req.body;
    
    if (!question) {
      req.flash('error', 'Item description is required.');
      return res.redirect('/profile'); // Redirect back if no description
    }

    const report = new returnReport({
      type: 'found',
      question: question,
      userId: req.user._id // Assuming user is logged in
    });
    console.log(report);
    // console.log(req.body);

    await report.save(); // Save the report to the database
    req.flash('success', 'Your found report has been submitted successfully.');
    return res.redirect('/report/user/myResponses'); // Redirect to user response page
  } catch (error) {
    console.error('Error saving found report:', error);
    req.flash('error', 'Error saving found report. Please try again.');
    return res.redirect('back'); // Redirect back to form on error
  }
};

// Route for handling 'lost' report
module.exports.lostResponse = async (req, res) => {
  try {
    const { question, location } = req.body;
    
    if (!description || !location) {
      req.flash('error', 'Item description and lost location are required.');
      return res.redirect('back'); // Redirect back if data is missing
    }

    const report = new returnReport({
      type: 'lost',
      question: question,
      location: location,
      userId: req.user._id // Assuming user is logged in
    });
    console.log(report);
    
    // console.log(req.body);

    await report.save(); // Save the report to the database
    req.flash('success', 'Your lost report has been submitted successfully.');
    return res.redirect('/report/user/myResponses'); // Redirect to user response page
  } catch (error) {
    console.error('Error saving lost report:', error);
    req.flash('error', 'Error saving lost report. Please try again.');
    return res.redirect('back'); // Redirect back to form on error
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






