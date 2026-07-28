const mongoose = require("mongoose");


const appointmentSchema = new mongoose.Schema({
    appointmentNumber:{
        type:String,
        unique:true,
        required:true,
    },
    doctor:{
        type:mongoose.Schema.ObjectId,
        ref:"Doctor"
    },
    patient:{
        type:mongoose.Schema.ObjectId,
        ref:"Patient",
        required:true
    },
    appointmentdate:{
        type:Date,
        required:true,
    },
    appointmentTime:{
        type:String,
        required:true
    },
    reason :{
        type:String,
        required:true,
        trim:true,
    },
    symptoms:{
        type:String,
        trim:true
    },
    status:{
        type:String,
        enum:["Confirmed" , "Pending","Checked-In", "Completed", "Cancelled"],

    },
    bookingtime:{
        type:String,
        enum:["online" , "walk-in" , "phone"],
        default:"online"
    },
    paymentstatus:{
        type:String,
        enum:["Pending" ,"Paid", "Refunded"],
        default:"Pending"
    },
    consultationfees:{
        type:String,
        required:true,
    },
    tokennumber:{
        type:Number,
    },
    notes:{
        type:String,
        trim:true
    }
},{timestamps:true});
appointmentSchema,index({
    doctor:1,
    appointmentdate:1,
    appointmentTime:1
},{
    unique:true,
    partialFilterExpression:{
        status:{
            $nim:["Cancelled"]
        }
    }
});

module.exports = mongoose.model("Appointment", appointmentSchema);