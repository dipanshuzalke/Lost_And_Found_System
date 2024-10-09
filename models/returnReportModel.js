const mongoose = require('mongoose');

// Define the schema for the return report
const returnReportSchema = new mongoose.Schema({
    type: String, // Either 'lost' or 'found'
    question: String,
    location: String,
    contact: Number,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: { type: Date, default: Date.now }
});

const returnReport = mongoose.model('returnReport', returnReportSchema);

module.exports = returnReport;
