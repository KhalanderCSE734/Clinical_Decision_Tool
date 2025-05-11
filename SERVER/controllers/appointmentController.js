import Patient from "../models/patientModel.js";
import Doctor from "../models/doctorModel.js";
import Appointment from "../models/appointmentModel.js";

import moment from "moment";

const bookAppointment = async (req,res)=>{
    
    try{

        const userId = req.user;
        
        if(!userId){
            return res.json({success:false,message:`User Is Not Authorized`});
        }

        const user = await Patient.findById(userId);
        if(!user){
            return res.json({success:false,message:`User Is Not Authorized`});
        }
        
        const { doctorId, slotDate, slotTime, fees } = req.body;
        // console.log(req.body);
        // Fees Can even be fetched by doctor
        if(!doctorId){
            return res.json({success:false,message:`Doctor Id Has Not been sent to Backend`});
        }

        const doctor = await Doctor.findById(doctorId);

        if(!doctor){
            return res.json({success:false,message:`There's no Doctor with provided ID`});
        }

        let slots_booked = doctor.slots_booked;

        // if(slotDate in slots_booked && ){
        //     return res.json({success:false,message:`There's No Slots Available At the Provided Time`});
        // }
        
        // console.log(slots_booked);

        if(!slotDate || !slotTime || !fees){
            return res.json({success:false,message:` Plase Select The Slots To Book Appointment`});
        }
        
        
        
        
        // const slot = await Doctor.findByIdAndUpdate(doctorId,
        //     {
            //         $set:{
        //             slots_booked:{
        //                 [slotDate]:slotTime,
        //             }
        //         }
        //     }
        // )


        let checkIfBooked = '';

        if(slots_booked){

            checkIfBooked = slots_booked.filter((slot,ind)=>{
                return slotDate == slot.date;
            })
            
        }

        console.log(checkIfBooked);

        if(checkIfBooked.length>0){
            const isAppointmentThere = checkIfBooked.filter((ele,ind)=>{
                return ele.time == slotTime;
            })
            console.log(isAppointmentThere);
            if(isAppointmentThere.length>0){
                console.log("Entered In ", checkIfBooked, "Time", isAppointmentThere);
                return res.json({success:false,message:`No Slots are Available`});
            }else{
                console.log(isAppointmentThere);
                let slot = await Doctor.findById(doctorId);

                slot.slots_booked.push({date:slotDate,time:slotTime});
    
                slot = await slot.save();
                           
            }
        }else{

            // const slot = await Doctor.findByIdAndUpdate(doctorId,
            //     {
            //         $push:{
            //             slots_booked: { [slotDate]:slotTime },
            //         }
            //     },
            //     { new: true }
            // )

            let slot = await Doctor.findById(doctorId);

            slot.slots_booked.push({date:slotDate,time:slotTime});

            slot = await slot.save();
            
            // console.log(slot);
        }



        const formattedDate = moment().format('DD-MM-YYYY');
        
        const appointment = await Appointment.create({
            patient:userId,
            doctor:doctorId,
            slotDate,
            slotTime,
            fees:doctor.fees,
            paymentMode:'CASH',
            paymentStatus:'pending',
            // dateCreated:Date.now(),
            dateCreated:formattedDate,
            cancelled:false,
        })
        
        // console.log(appointment);
        
        return res.json({success:true,message:`Appointment Booked SuccessFully`});
        
    }catch(error){
        console.log("Error In Booking Appointment End Point",error);
        return res.json({success:false,message:`Error In Booking Appointment End Point ${error}`})
    }

}


const getAllAppointments = async (req,res)=>{
    
    try{

        // const appointments = await Appointment.find().populate('user').populate('doctor');
        const appointments = await Appointment.find().populate([{path:'patient',select:'-password'},{path:'doctor',select:'-password'}])
        
        // console.log(appointments);

        return res.json({success:true,appointments});

    }catch(error){
        console.log("Error In Getting Appointment details End Point",error);
        return res.json({success:false,message:`Error In Getting Appointment details End Point ${error}`})
    }

}


export { bookAppointment, getAllAppointments };