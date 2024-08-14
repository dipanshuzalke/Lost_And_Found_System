const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    
    item :{
        type : String,
        required : true,
        default :"",
        set : (v)=> v === "" ?"hi":v,

    },
    description :{ 
        type : String,
        required : true,
        default :"",
        set : (v)=> v === "" ? "hi":v,

    },
    question :{ 
        type : String,
        required : true,
        default :"",
        set : (v)=> v === "" ? "hi":v,


    },
});

const reports = mongoose.model("reports", reportSchema);
module.exports = reports;

