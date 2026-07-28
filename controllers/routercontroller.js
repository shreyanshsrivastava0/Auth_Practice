const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Appointment= require("../models/Appointment");

const Createdoctor = async(req, res, next)=>{
    try{
        const doctor = await Doctor.create(req.body);
        res.status(201).json({
       status: true,
       message:"doctor required successfully",
       data :doctor
        })
    }catch(error){
        next(error);
    }
};


const getdoctor = async(req,res)=>{
    try {
        const {specialization ,search , active} = req.query;
        const filter = {};
        if(specialization){
            filter.specialization = {
                $regex : specialization,
                $option : "1"
            }
        }
        if(search){
            filter.$or = [
                 { name:{
                    $regex:search,
                    $options: "i"
                 },
                },{
                    specialization:{
                        $regex:search,
                        $options:"i",
                    },
                },
            ];
        }
        if(active !== undefined){
            filter.isAtive = active ==="true"
        }

        const doctors = (await Doctor.find(filter)).toSorted({createdAt:-1});
        res.json({
            success:true,
            count:doctors.length,
            data:doctors
        })
    } catch (error) {
        console.log(error);
    }
};

const getsingledoctor = async(req, res,next) =>{
    try {
        const {id} = req.params.id;
        const doctor = await Doctor.findById(id);
        if(!doctor){
            return res.status(403).json({
                success:false,
                message:"Doctor Not found"
            })
        }
        res.json({
            success:true,
            data:doctor
        });
    } catch (error) {
        next(error);
    }
};

const updateDoctor = async(req,res,next)=>{
try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body , {
        new:true,
        runvalidator:true
    });
    if(!doctor){
        return res.status(403).json({
            success:true,
            message:"Doctor not found",
            
        });
    }res.json({
        success:true,
        message:"Doctor record updated",
        data :doctor,
    })
} catch (error) {
    next(error);
}

};


const StatusDoctor = async(req,res,next)=>{
    try {
        const {isActive} = req.body;
        const doctor = await Doctor.findByIdAndUpdate(
            req.params.id,{isActive},{
                new:true,
                runValidators:true
            }
        );
        if(!doctor){
            return res.return(403).json({
                success:true,
                message:"Doctor Status updated",
                data:doctor
            });
        }
    } catch (error) {
        next(error);
    }
}

const getAllappointments=async(req,res, next)=>{
    try {
        const{id}  =req.params;
        const appointments = Appointment.find({
            doctor = id
        }
        ).populate("patient", "name age phone gender").sort({
            appointmentDate : 1,
            appointmentTime: 1
        });
        res.json({
            success:true,
            count: appointments.length,
            data:appointments
        })

    } catch (error) {
        next(error);
    }
}

module.exports = {getdoctor, getAllappointments, getsingledoctor ,updateDoctor ,Createdoctor};