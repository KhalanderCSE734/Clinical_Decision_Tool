


import Doctor from '../models/doctorModel.js';

import Patient from '../models/patientModel.js';

import Appointment from '../models/appointmentModel.js';


import PatientDetails from '../models/patientDetailsModel.js';


import cloudinary from '../config/cloudinary.js';  




import bcrypt from 'bcryptjs';



import { setDoctorTokenAndCookies } from '../middlewares/jwtAuth.js';



const login = async (req,res)=>{
    try{

        const { email, password } = req.body;

        if(!email || !password){
            return res.json({success:false,message:`All Mentioned Feilds Are Mandatory`});
        }

        const doctor = await Doctor.findOne({email});

        if(!doctor){
            return res.json({success:false,message:`Doctor With Provided Mail Id Doesn't exists`});
        }

        // console.log(doctor);
        // console.log(doctor.password,password);

        const isPassWordMatch = await bcrypt.compare(password,doctor.password);
        
        // console.log(isPassWordMatch);

        if(!isPassWordMatch){
            return res.json({success:false,message:`Invalid PassWord`});
        }


        setDoctorTokenAndCookies(doctor,res);
        

        return res.json({success:true,message:`Doctor Logged In SuccessFully`});



    }catch(error){
        console.log("Error In Doctor Login EndPoint ",error);
        return res.json({success:false,message:`Error In Doctor Login EndPoint ${error} `});
    }    
}    




const getAllAppointments = async (req,res)=>{


    try{

        // const { doctorIdFrontEnd } = req.body;
        const doctorIdMiddleware = req.doctor;
        
        // console.log(doctorIdFrontEnd,doctorIdMiddleware);
        
        
        const appointments = await Appointment.find().populate('doctor').populate('patient');

        

        // console.log(appointments);

        const appArray = appointments.filter((app,ind)=>{
            return app.doctor._id == doctorIdMiddleware
        })
        
        return res.json({success:true,message:appArray});

    }catch(error){
        console.log("Error In Getting All Appointments, Doctor EndPoint ",error);
        return res.json({success:false,message:`Error In Getting All Appointments, Doctor EndPoint ${error.message}`});
    }

}







const cancelAppointment = async (req,res)=>{
    try{

        const doctorId = req.doctor;

        // console.log(doctorId);

        // console.log(req.body);

        const { appointmentId } = req.body;

        if(!appointmentId){
            return res.json({success:false,message:`Appointment ID is Compulsory `});
        }


        if(!doctorId){
            return res.json({success:false,message:`Doctor Is Not Authorized, Login Again Please`});
        }

        const doctor = await Doctor.findById(doctorId);

        if(!doctor){
            return res.json({success:false,message:`Doctor Is Not Found, Login Again Please`});
        }

        const appointment = await Appointment.findById(appointmentId);

        if(!appointment){
            return res.json({success:false,message:`Appointment Was Not Found`});
        }
        
        const slotDate = appointment.slotDate;
        const slotTime = appointment.slotTime;
        
        doctor.slots_booked = doctor.slots_booked.filter((slot,ind)=>{
            return !(slot.date==slotDate) && !(slot.time==slotTime);
        })

        await doctor.save();

        const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentId,
            {
                $set:{
                    cancelled:true,
                }
            }
        )

        return res.json({success:true,message:'Appointment Cancelled Success Fully'});

    }catch(error){
        console.log(`Error In Cancelling Appintment By Doctor in Doctor Controller Cacncel Appointment EndPoint ${error}`);
        return res.json({success:false,message:`Error In Cancelling Appintment By Doctor in Doctor Controller Cacncel Appointment EndPoint ${error}`});
    }
}





const completeAppointment = async (req,res)=>{
    try{

        const doctorId = req.doctor;

        const { appointmentId } = req.body;

        if(!appointmentId){
            return res.json({success:false,message:`Appointment ID is Compulsory `});
        }

        if(!doctorId){
            return res.json({success:false,message:`Doctor Is Not Authorized, Login Again Please`});
        }

        const appointment = await Appointment.findById(appointmentId);

        const doctor = await Doctor.findById(doctorId);

        if(!appointment){
            return res.json({success:false,message:`Appointment Not Found`});
        }
        if(!doctor){
            return res.json({success:false,messasge:`Doctor Not Found`});
        }


        if(appointment.cancelled){
            return res.json({success:false,message:`Appointment Can't be Completed As it is Cancelled`});
        }

        if(appointment.paymentStatus === 'pending'){
            if(appointment.paymentMode == 'ONLINE'){
                return res.json({success:false,message:`Payment Is Not Yet Done, Appointment Can't Be completed`});
            }
        }

        

        const slotDate = appointment.slotDate;
        const slotTime = appointment.slotTime;


        doctor.slots_booked = doctor.slots_booked.filter((slot,ind)=>{
            return !(slot.date==slotDate) && !(slot.time==slotTime);
        })

        await doctor.save();

        appointment.completed = true;
        appointment.paymentStatus = 'done';

        await appointment.save();

        if(appointment.paymentMode==='CASH'){
            return res.json({success:true,message:`Appointment Completed SuccesFully (Payment Mode = 'CASH' )`});
        } else{
            return res.json({success:true,message:`Appointment Completed SuccesFully (Payment Mode = 'ONLINE' )`});
        }


    }catch(error){
        console.log(`Error In Completing Appintment By Doctor in Doctor Controller Complete Appointment EndPoint ${error}`);
        return res.json({success:false,message:`Error In Completing Appintment By Doctor in Doctor Controller Complete Appointment EndPoint ${error}`});        
    }
}



const updateProfile = async (req,res)=>{
    try{

        const doctorId = req.doctor;

        if(!doctorId){
            return res.json({success:false,message:`Doctor Is Not Authorized Login Again Please`});
        }

        const doctor = await Doctor.findById(doctorId);

        if(!doctor){
            return res.json({success:false,message:`Doctor Is Not Authorized Login Again Please`});
        }

        const { profilePic, address, fees, about } = req.body;

        if(!profilePic){
            return res.json({success:false,message:`Profile Pic Is Mandatory To Update the Profile`});
        }

        if(!address){
            return res.json({success:false,message:`Address Is Mandatory To Update the Profile`});
        }

        if(!fees){
            return res.json({success:false,message:`Fees Is Mandatory To Update the Profile`});
        }

        if(!about){
            return res.json({success:false,message:`Description About Yourself Is Mandatory To Update the Profile`});
        }

        const image = await cloudinary.uploader.upload(profilePic);

        const uploadURL = image.secure_url;

        const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId,
            {
                $set:{
                    profilePic:uploadURL,
                    address, 
                    fees,
                    about
                }
            }
        )

        return res.json({success:true,message:`Doctor Profile Has Been Updated SuccessFully`});


    }catch(error){
        console.log(`Error In Upating Doctor Profile Appointment EndPoint ${error}`);
        return res.json({success:false,message:`Error In Upating Doctor Profile Appointment EndPoint ${error}`});         
    }
}




const logOut = async (req,res)=>{
    try{    

        res.clearCookie('JWT_Doctor',{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'development' ? 'strict' : 'none',
        });    

        return res.json({success:true,message:'Doctor Logged Out SuccessFully'});

    }catch(error){
        console.log(`Error In LogOut EndPoint of Doctor ${error}`);
        res.json({success:false,message:`Error In LogOut EndPoint of Doctor ${error}`});
    }    
}    





const getCurrentDoctor = async (req,res)=>{
    
    try{

        
        const  doctorId  = req.doctor;
        // console.log(doctorId);
        if(!doctorId){
            return res.json({success:false,message:`Doctor is Not Authorized`});
        }
       
        const doctor = await Doctor.findById(doctorId).select(['-password']);

        if(!doctor){
            return res.json({success:false,message:`Doctor Doesn't Exist `});
        }

        // console.log(doctor);

        return res.json({success:true,message:doctor});

          
    }catch(error){
        console.log(`Error In Getting Doctor Data End Point ${error}`);
        res.json({success:false,message:`Error In Getting Doctor Data End Point, ${error}`});
    }

}





const doctorAuthCheck = async (req,res)=>{
    try{

        return res.json({success:true,message:`Doctor Is Authorized`});

    }catch(error){
        return res.json({success:false,message:`Error In DoctornAuthCheck End-Point`});
    }    
} 




const getPatientDetails = async (req,res)=>{
    try{
        const patientId = req.params.patientId;
        if(!patientId){
            return res.json({success:false,message:`Patient Id Not found`});
        }

        const details = await PatientDetails.findOne({patient:patientId}).populate('patient');

        if(!details){
            return res.json({success:false,message:`Patient Details Not Found`});
        }

        // console.log(details);

        return res.json({success:true,message:details});



    }catch(error){

    }
}



export { login, logOut, doctorAuthCheck, getCurrentDoctor, getAllAppointments, cancelAppointment, completeAppointment, updateProfile, getPatientDetails };