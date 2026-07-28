const { model } = require("mongoose");
const { applyTimestamps } = require("./Doctor");

const mongoose  =required("mongoose");


const patientSchema = new mongoose.Schema({
  name:{
    type: String,
    required:[true,"required name field"],
    trim:true,
  },
  phone:{
    type:String,
    required:[true, "Phone number is required"],
    trim:true,
    index:true,
  },
  email:{
    type:String,
    lowercase:true,
    trim:true,

  },
  age:{
    type:Number,
    required:true,
    min:0,
  },
  gender :{
    type:String,
    enum:["Male" , "Female" , "other"],
    required:true,
  },
  address:{
    type:String,
    trim:true,
  },

  totallists:{
    type:Number,
    default:0
  },
  lastvisits:{
    type:Date
  }

},{timestamps:true});


module.exports = mongoose.model("Patient", patientSchema);