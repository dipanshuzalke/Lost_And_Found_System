const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const reports = require("./models/reportModel.js");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

let MONGO_URL = ("mongodb://127.0.0.1:27017/lost&found");

main()
   .then(()=>{
    console.log("connected to DB");
   })
   .catch((err)=>{
    console.log(err);
   });

async function main(){
    await mongoose.connect(MONGO_URL);
}




//root route
app.get("/", async (req, res) => {
    let Allreports = await reports.find({});
    res.render("index.ejs", {Allreports});
});

// add new report route
app.get("/report/new", async (req, res) => {
    let Allreports = await reports.find({});
    res.render("new.ejs", {report : Allreports});
});

// 
app.post("/report", async (req, res) => {
    let newReport = new reports(req.body.reports);
    await newReport.save();
    res.redirect("/");
});

// //To get one post using id
app.get("/report/:id", async (req, res) => {
    let { id } = req.params;
    let report = await reports.findById(id);
    res.render("show.ejs", { report });
});


// //Serve the edit form
app.get("/report/:id/edit", async (req, res) => {
    let { id } = req.params;
    let report = await reports.findById(id);
    res.render("edit.ejs", { report });
});

app.put("/report/:id", async (req, res)=>{
    let {id} = req.params;
    await reports.findByIdAndUpdate(id,{...req.body.report});
    res.redirect("/");
});

app.delete("/report/:id", async (req, res) => {
    let { id } = req.params;
    await reports.findByIdAndDelete(id,{...req.body.reports});
    res.redirect("/");
});


app.listen(8080, () => {
    console.log("listening on port 8080");
});




