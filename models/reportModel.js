const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  itemName: {
    type: String,
    required: true,
    default: "",
    set: (v) => (v === "" ? "hi" : v),
  },
  description: {
    type: String,
    required: true,
    default: "",
    set: (v) => (v === "" ? "hi" : v),
  },
  location: {
    type: String,
    required: true,
    default: "",
    set: (v) => (v === "" ? "hi" : v),
  },
  question: {
    type: String,
    required: true,
    default: "",
    set: (v) => (v === "" ? "hi" : v),
  },
  itemType: {
    type: String,
    required: true,
    default: "",
    set: (v) => (v === "" ? "hi" : v),
  },
  status: {
    type: String,
    required: true,
    default: "",
    set: (v) => (v === "" ? "hi" : v),
  },
  image: {
    url: String,
    filename: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;

