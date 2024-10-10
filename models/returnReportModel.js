const mongoose = require('mongoose');

// Define the schema for the return report
const returnReportSchema = new mongoose.Schema({
    type: {
        type: String, // Either 'lost' or 'found'
        required: true
    },
    question: {
        type: String, // Description of the item
        required: true
    },
    location: {
        type: String, // Location for lost items
        required: function() {
            return this.type === 'lost'; // Location is required only for lost items
        }
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const returnReport = mongoose.model('returnReport', returnReportSchema);
module.exports = returnReport;
