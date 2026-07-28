const mongoose = require("mongoose");


const doctorSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,"Doctor name is required"],
        trim:true
    },
    specialization:{
        type:String,
        required:[true,"Specialization is required"],
        trim:true,
    },
    qualification:{
        type:String,
        required:[true,"Qualification is required"],
        trim:true,
    },
    experience:{
        type:Number,
        default:0,
    },
    consultationfees:{
        type:Number,
        required:true,
        min:0,
    },
    phone:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        sparse:true,
        lowercase:true,
    },
    avaliabledate : [{
        type:String,
       enum: ["monday " , "tuesday" , " wednesday" , "saturday"],
    }],
    starttime:{
        type:"String",
        requiured:true,
    },
    endtime:{
        type:String,
        required:true,
    },
    slotDuration:{
        type:String,
        required:true,
    },
    roomNumber:{
        type:String,
        required:true,
    },
    isActive:{
        type : Boolean,
        required:true,
    }
},{
    timestamps:true,
});

module.exports = mongoose.model("Doctor", doctorSchema);