const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
// const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn } = require("../middleware.js");

const returnReportController = require("../controllers/returnReport.js");

// router.get('/myResponse', isLoggedIn, returnReportController.successReport);

router.post('/found', isLoggedIn, returnReportController.foundResponse);

router.post('/lost', isLoggedIn, returnReportController.lostResponse);

router.get('/myResponses', isLoggedIn, returnReportController.getUserResponse);

router.get('/myResponses/:id', isLoggedIn, returnReportController.showUserResponse);


module.exports = router;