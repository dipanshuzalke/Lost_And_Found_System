

//Connecting Login Route
module.exports.isLoggedIn = (req, res, next) => {
    // console.log(req.path, "..", req.originalUrl);
    if (!req.isAuthenticated()) {
    //   req.flash("error", "you must be logged in to create new report!");
      return res.redirect("/report");
    }
    next();
};