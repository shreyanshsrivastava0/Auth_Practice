const mongoose = require("mongoose");

const connectDB = ()=>{
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("database connected");
  } catch (error) {
    console.log("unable to connect DB");
  }
};

module.exports = connectDB;