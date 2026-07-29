const Patient = require("../models/Patient");
const Appointments  =require("../models/Appointment");

const getPatients = async(req, res , next)=>{
    try {
        const {search} = req.query;
        const filter = {};
        if(search){
            filter.$or=
            [{
                name: {
                $regex:search,
                $options:"i",
                }
            },{
                phone:{
                    $regex:search,
                    $option:"i",
                }
            }
        ]
        }
    const patients = await Patient.find(filter).sort({createdAt:-1});
    res.json({
        success:true,
        count:patients.length,
        data:patients
    });
    } catch (error) {
       next(error); 
    }
}
const getSinglepatient = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const patient = await Patient.findById(id);
        if(!patient){
            return res.status(403).json({
                success:false,
                message:"Patient Not Found"
            });
        }
        res.json( {
            success:true,
            data:patient
        })
    } catch (error) {
        next(error);
    }
}

const getpatientsAppointments = async(req,res,next)=>{
 try {
    const {id} = req.params;
    const appointments = Appointments.find({
        patient:id
    }).populate("doctor", "name specialization consultationfees roomNumber").sort({
        appointmentDate:1
    })
    res.json({
        success:true,
        count:appointments.length,
        data: appointments
    })


 } catch (error) {
    next(error);
 }

}
module.exports = {getPatients,getSinglepatient , getpatientsAppointments};