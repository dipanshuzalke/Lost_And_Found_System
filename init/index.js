const mongoose = require("mongoose");
const initData = require("./data.js");
const Reports = require("../models/reportModel.js");

const MONGO_URL = ("mongodb://127.0.0.1:27017/minorProject");

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

const initDB = async ()=>{
    await Reports.deleteMany({});
    //Inserting object property(owner) in data.js
    initData.data = initData.data.map((obj) => ({
        ...obj, owner: '66d22e46dc0dc0df22c0b341'
      }));
    await Reports.insertMany(initData.data);
    console.log("date was initialized");
};

initDB();