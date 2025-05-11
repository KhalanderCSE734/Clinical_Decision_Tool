

import bcrypt from 'bcryptjs';
import validator from 'validator';

import 'dotenv/config';



import Doctor from '../models/doctorModel.js';

import Patient from '../models/patientModel.js';

import Appointment from '../models/appointmentModel.js';



import cloudinary from '../config/cloudinary.js';



import { setUserTokenAndCookie, generateTokenForAdmin } from '../middlewares/jwtAuth.js';





// Admin Login 


const login = async (req,res)=>{
    
    try{

        const { email, password } = req.body;

        if(!email || !password){
            return res.json({success:false,message:`All Fields Are Mandatory`});
        }

        if(email!==process.env.ADMIN_EMAIL){
            return res.json({success:false,message:'Invalid Credentials'});
        }
        if(password!==process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:'PassWord Is Incorrect'});
        }

        generateTokenForAdmin(res);

        return res.json({success:true,message:'Admin Logged In SuccessFully'});


    }catch(error){
        return res.json({success:false,message:`Error in Admin Login, ${error}`});
    }

}







// End Point for Creating / Adding New Doctor By Admin
const AddNewDoctor = async (req,res)=>{

    try{    

        const { fullName, email, password, profilePic, speciality, degree, experience, about, fees, address} = req.body;

        //  'date' , 'slots_booked'  'available' data is not taken

        if(!fullName || !email || !password || !profilePic || !speciality || !degree || !experience || !about || !fees || !address){
            res.json({success:false,message:"All Mentioned Fields Are Cumplsory"});
        }

        const uploadProfile = await cloudinary.uploader.upload(profilePic);

        // 'url' is uploadProfile.secure_url

        console.log(uploadProfile);
        console.log(req.body);

        if(!validator.isEmail(email)){
            return res.json({success:false,message:`Please Enter a Valid E-mail`});
        }
        if(password.length<8){
            return res.json({success:false,message:`PassWord Must be minimum of 8 character long`});
        }


        const doctorExist = await Doctor.findOne({email});

        if(doctorExist){
            return res.json({success:false,message:`Doctor With The Provided Mail Already Exists, Please Try Different Email`});
        }

        
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        

        console.log("address",address);

        const newDoctor = await Doctor.create({
            fullName,
            email,
            password:hashedPassword,
            profilePic:uploadProfile.secure_url,
            speciality,
            degree,
            experience,
            about,
            fees:Number(fees),
            // address:JSON.parse(address),          
            address:address,
            date:Date.now(),
        })

        // Since We are getting the address as string from the middleware (app.use(express.json())) we need to convert it to Object so parse it 

        // setUserTokenAndCookie(newDoctor,res);

        console.log(` New Doctor Created ${newDoctor} `);

        return res.json({success:true,message:`Doctor Has Created SuccessFully`});


    }catch(error){
        res.json({success:false,message:`Error In AddNewDoctor ENDPOINT ${error}`});
    }

}




const getAllDoctors = async (req,res)=>{
    try{

        const allDoctors = await Doctor.find({},{password:0});
        // console.log(allDoctors);

        res.json({success:true,message:allDoctors});

    }catch(error){
        res.json({success:false,message:`Error In GetAllDoctors ENDPOINT ${error}`});
    }
}




const getAllPatients = async (req,res)=>{
    try{

        const allPatients = await Patient.find({},{password:0});
        // console.log(allPatients);

        res.json({success:true,message:allPatients});

    }catch(error){
        res.json({success:false,message:`Error In GetAllPatients ENDPOINT ${error}`});
    }
}





// Change Doctor Availability

const changeDoctorAvailability = async (req,res)=>{
    try{

        const { doctorId } = req.params;

        if(!doctorId){
            return res.json({success:false,message:`Doctor Id is compulsory to change AVailability`});
        }


        const doctor = await Doctor.findOne({_id:doctorId});
        // const doctor = await Doctor.findById(doctorId);

        if(!doctor){
            return res.json({success:false,message:`Doctor with Provided ID doesn't Exists`});
        }


        // const updatedDoctor = await Doctor.findByIdAndUpdate(
        //      doctorId ,
        //     {
        //         $set:{
        //             available:!doctor.available,
        //         }
        //     },
        //     {new:true}
        // )
        const updatedDoctor = await Doctor.findOneAndUpdate(
            { _id: doctorId },
            {
                $set:{
                    available:!doctor.available,
                }
            },
            {new:true}
        )

        // console.log(updatedDoctor);

        res.json({success:true,message:`${updatedDoctor.fullName}'s  Availability Changed SuccessFully`,available:updatedDoctor.available});


    }catch(error){
        res.json({success:false,message:`Error Occured In Changing Doctor AVailability Route ${error}`});
    }
}



const deleteDoctor = async(req,res)=>{

    try{

        const { doctorId } = req.params;

        // console.log(doctorId);

        const doctor = await Doctor.findById(doctorId);

        console.log(doctor);

        if(!doctor){
            return res.json({success:false,message:`There's No Doctor With The Provided Id`});
        }

        const updatedDoctor = await Doctor.findByIdAndDelete(doctorId, { new : true });

        // console.log(updatedDoctor);


        return res.json({success:true,message:`Dr. ${doctor.fullName} Deleted Success Fully`});



    }catch(error){
        res.json({success:false,message:`Error Occured In Deleting Doctor EndPoint ${error}`});
    }
}





const cancelAppointment = async(req,res)=>{

    try{

        const { appointmentId }  = req.body;

        if(!appointmentId){
            return res.json({success:false,message:`Failed to Get the Appointment Id`});
        }

        const appointment = await Appointment.findById(appointmentId);

        if(!appointment){
            return res.json({success:false,message:`No appointment With Provided Id `});
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentId,
            {
                $set:{
                    cancelled:true,
                }
            }
        )



        const doctorId = appointment.doctor._id;
        const slotDate = appointment.slotDate;
        const slotTime = appointment.slotTime;

        if(!doctorId){
            return res.json({success:false,message:`Doctor ID not found to update`});
        }

        const doctor = await Doctor.findById(doctorId);


        // const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId,
        //     {
        //             $pull:{

        //                 slot_booked:{

        //                     date:slotDate,
        //                     time:slotTime,
        //                 }

        //             }
        //     },
        //     {new:true}
        // )

        // console.log(updatedDoctor);

        // Above won't work because we even have '_id' in that object so

        doctor.slots_booked = doctor.slots_booked.filter((slot,ind)=>{
            return !(slot.date===slotDate && slot.time==slotTime);
        })

        const updatedDoctor = await doctor.save();

        return res.json({success:true,message:`Appointment Cancelled SuccessFully`});
        
        

    }catch(error){
        res.json({success:false,message:`Error Occured In Cancelling Appointment EndPoint ${error}`});
    }



}





const logOut = async (req,res)=>{
    try{    

        res.clearCookie('JWT_Admin',{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'development' ? 'strict' : 'none',
        });

        return res.json({success:true,message:'Admin Logged Out SuccessFully'});

    }catch(error){
        res.json({success:false,message:`Error In LogOut EndPoint of Admin ${error}`});
    }
}



const adminAuthCheck = async (req,res) =>{
    try{

        return res.json({success:true,message:`Admin Is Authorized`});

    }catch(error){
        return res.json({success:false,message:`Error In AdminAuthCheck End-Point`});
    }
}




export { AddNewDoctor, login, adminAuthCheck, logOut, getAllDoctors, getAllPatients, changeDoctorAvailability, deleteDoctor, cancelAppointment };