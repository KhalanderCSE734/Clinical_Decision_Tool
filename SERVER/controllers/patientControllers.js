import bcrypt from 'bcryptjs';

import validator from 'validator';



import Doctor from "../models/doctorModel.js";
import Patient from '../models/patientModel.js';
// import Appointment from '../models/appointmentModel.js';



import cloudinary from '../config/cloudinary.js';


import { setUserTokenAndCookie } from '../middlewares/jwtAuth.js';

import Appointment from '../models/appointmentModel.js';


import RazorPay from 'razorpay';


const signUp = async (req,res)=>{
    try{

        const { fullName, email, password } = req.body;

        if(!fullName || !email || !password){
            return res.json({success:false,message:`All Fields Are Mandatory`});
        }


        if(!validator.isEmail(email)){
            return res.json({success:false,message:`Please Provide The Proper Mail`});
        }

        if(password.length<8){
            return res.json({success:false,message:`Password Must be minimum of length 8`});
        }


        const userExists = await Patient.findOne({email});

        if(userExists){
            return res.json({success:false,message:`User With Provided Mail Already Exists`});
        }

        const saltRound = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password,saltRound);

        const newUser = await Patient.create({
            fullName,
            email,
            password:hashedPassword,
        })

        setUserTokenAndCookie(newUser,res);

        // console.log("New User Created SUccessfully",newUser);

        res.json({success:true,message:`A new Patient Has Been Registered Success Fully \n Please Update Your Profile`});


    }catch(error){
        console.log(`Error In Signup End-Point of User (Patient) ${error}`);
        res.json({success:false,message:`Error In Signup End Point ${error}`});
    }
}



const login = async (req,res)=>{
    try{

        const { email, password } = req.body;
        
        if(!email || !password) {
            return res.json({success:true,message:`All Mentioned Fields Are Mandatory To Sign up`});
        }

        const user = await Patient.findOne({email});

        if(!user){
            return res.json({success:false,message:`User With the Provided Mail Doesn't Exist `});
        }

        const isPassWordCorrect = await bcrypt.compare(password,user.password); // The 'argument' order should be same as this, otherwise we won't get proper expected output 

        if(!isPassWordCorrect){
            return res.json({success:false,message:`Incorrect PassWord, Please Try Again`});
        }

        setUserTokenAndCookie(user,res);

        return res.json({success:true,message:`Patient Logged In SuccessFully`});


    }catch(error){
        console.log(`Error in Login End Point of Patient ${error}`);
        res.json({success:false,message:`Error In Login End Point ${error}`});
    }
}




const updateProfile = async(req,res)=>{

    try{

        const userId = req.user;

        let { fullName, phoneNum, address, gender, dateOfBirth, profilePic } = req.body;

        // console.log(req.body);


        if(!userId){
            return res.json({success:false,message:`Patient Is Not Authorized`});
        }

        if(!phoneNum || !address || !gender || !dateOfBirth || !profilePic ){
            return res.json({success:false,message:`All Fields Are Mandatory (Name is Optional)`});
        }

        


        const selectedPatient = await Patient.findById(userId);

        if(!selectedPatient){
            return res.json({success:false,message:`Patient Doesn't Exists`});
        }

        if(!fullName || fullName==""){
            fullName = selectedPatient.fullName;
        }

        const image = await cloudinary.uploader.upload(profilePic);

        const uploadURL = image.secure_url;

        const updatedPatient = await Patient.findByIdAndUpdate(userId,
            {
                $set:{
                    fullName,
                    profilePic:uploadURL,
                    gender,
                    dateOfBirth,
                    address,
                    phoneNum,
                }
            },
            { new:true }
        )

        console.log(updatedPatient);

        res.json({success:true,message:`Patient's Profile Has Been Updated SuccessFully`});


    }catch(error){
        console.log(`Error in Update Profile End-Point of Patient ${error}`);
        res.json({success:false,message:`Error in Update Profile End-Point of Patient ${error}`});        
    }

}





const logOut = async (req,res)=>{
    try{

        res.clearCookie('JWT_User',{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'development' ? 'strict' : 'none',
        })

        return res.json({success:true,message:`Patient Logged Out Success Fully`});

    }catch(error){
        console.log(`Error In LogOut of Patient End Point ${error}`);
        res.json({success:false,message:`Error In LogOut of Patient End Point, ${error}`});
    }
}






const checkPatientAuthorization = async (req,res)=>{

    try{

        return res.json({success:true,message:`User is Authorised`});

    }catch(error){
        console.log(`Error In CHecking Patient Authorisation End Point ${error}`);
        res.json({success:false,message:`Error In Checking Patient Authorization Rotue, ${error}`});
    }

}



const getCurrentPatient = async (req,res)=>{
    
    try{

        
        const  userId  = req.user;
        // console.log(userId);
        if(!userId){
            return res.json({success:false,message:`Patient is Not Authorized`});
        }
       
        const patient = await Patient.findById(userId).select(['-password']);

        if(!patient){
            return res.json({success:false,message:`Patient Doesn't Exist `});
        }

        // console.log(patient);

        return res.json({success:true,message:patient});

          
    }catch(error){
        console.log(`Error In Getting Patient Data End Point ${error}`);
        res.json({success:false,message:`Error In Getting Patient Data End Point, ${error}`});
    }

}







const showAllDoctors = async (req,res)=>{
    try{

        const doctorsList = await Doctor.find();
        // const doctorsList = await Doctor.find().select(['-password','-email']); // To Exclude these
        // console.log(doctorsList);
        res.json({success:true,message:doctorsList});

    }catch(error){
        res.json({success:false,message:`Error in showAllDoctors End Point UserControllers`});
    }
}




export const tempShowAllDoctors = async (req,res)=>{
    try{

        const doctorsList = await Doctor.find().select(['slots_booked','fullName']);
        const removedDoctorsList = await Doctor.updateMany( { } , { $set :{ slots_booked: [ {date:' ', time:' '} ] } });
        // const doctorsList = await Doctor.find().select(['-password','-email']); // To Exclude these
        // console.log(doctorsList);
        // const deletedAppointment = await Appointment.deleteMany();
        // console.log(deletedAppointment);
        res.json({success:true,message:doctorsList});

    }catch(error){
        console.log(error);
        res.json({success:false,message:`Error in TempShowAllDoctors End Point UserControllers`});
    }
}




const showSelectedPatientAppointment = async (req,res)=>{
    try{

        const userId  = req.user;

        if(!userId){
            return res.json({success:false,message:`Patient Is Not Authorized`});
        }
        
        const appointments = await Appointment.find().populate('patient').populate('doctor');

        const filteredAppointments = appointments.filter((app,ind)=>{
            return app.patient._id == userId;
        })



        return res.json({success:true,appointments:filteredAppointments});



    }catch(error){
        console.log(`Error in showSelectedPatientAppointment End Point UserControllers ${error}`);
        res.json({success:false,message:`Error in showSelectedPatientAppointment End Point UserControllers ${error}`});
    }
}




const cancelAppointment = async(req,res)=>{

    try{

        const { appointmentId }  = req.body;

        console.log(appointmentId);

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



// RAZORPAY PAYMENT OPTION

/// Get this after completing the KYC of razorpay website


/**
 * 
 const rzorpayInstance = new RazorPay({
    key_id:'',
    key_secret:'',
})

* 
*/

const createPaymentOrder = async(req,res)=>{

    try{

        const { appointmentId } = req.body;

        const appointment = await Appointment.findById(appointmentId);

        if(!appointment){
            return res.json({success:false,message:`Appointment Not Found`});
        }

        if(appointment.cancelled){
            return res.json({success:false,message:`Appointment Already Cancelled`});
        }



        // Options for RazorPay

        const razorOptions = {
            amount : appointment.fees * 100, // We have to convert it to 
            currency : "INR",
            reciept : appointment._id,
        }

        const order = await rzorpayInstance.orders.create(razorOptions);



        res.json({success:true,message:`Payment Order Created SuccessFully`,order});


    }catch(error){
        res.json({success:false,message:`Error Occured In Creating payment EndPoint ${error}`});        
    }

}



const verifyRazorPayPayment = async (req,res)=>{
    try{
        const { razorpay_order_id } = req.body;

        const orderInfo = await rzorpayInstance.orders.fetch(razorpay_order_id);

        console.log(orderInfo);

        const appointmentId = orderInfo.receipt;

        if(orderInfo.status === 'paid'){
            await Appointment.findByIdAndUpdate(appointmentId, {
                $set:{
                    paymentStatus:'done',
                    paymentMode:'ONLINE',
                }
            } )
            return res.json({success:true,message:'Payment Made SuccessFull'});
        }else{
            return res.json({success:false,message:'Payment Failed'});
        }


    }catch(error){
        res.json({success:false,message:`Error Occured In Verifying payment EndPoint ${error}`});  
    }
}





export { signUp, login, logOut, checkPatientAuthorization, getCurrentPatient, updateProfile, showAllDoctors, showSelectedPatientAppointment, cancelAppointment, createPaymentOrder, verifyRazorPayPayment };