
import Message from "../models/messageModel.js";

import Patient from '../models/patientModel.js';


import cloudinary from '../config/cloudinary.js'


const doctorSendMessage = async (req,res)=>{
    try{

        const doctorId = req.doctor;

        const patientId = req.params.patientId;

        const { text,image } = req.body;
        
        let imageURl="";

        if(image && image.trim() !== ""){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageURl = uploadResponse.secure_url;
        }
        
        if(!text){
            text = " ";
        }

        const newMessage = await Message.create({
            patientId:patientId,
            doctorId:doctorId,
            text:text,
            image:imageURl,
            isSenderPatient:false,
        });



        await newMessage.save();


        return res.json({success:true,message:newMessage});




    }catch(error){
        console.log("Error In Sending Messages From Doctor ",error);
        return res.json({success:false,message:`Error In sending message From Doctor Back-End ${error}`});
    }
}




const patientSendMessage = async (req,res)=>{
    try{

        const userId  = req.user;

        const doctorId = req.params.doctorId;

        const { text,image } = req.body;
        
        let imageURl="";

        if(image && image.trim() !== ""){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageURl = uploadResponse.secure_url;
        }
        
        if(!text){
            text = " ";
        }

        const newMessage = await Message.create({
            patientId:userId,
            doctorId:doctorId,
            text:text,
            image:imageURl,
            isSenderPatient:true,
        });



        await newMessage.save();


        return res.json({success:true,message:newMessage});




    }catch(error){
        console.log("Error In Sending Messages From Doctor ",error);
        return res.json({success:false,message:`Error In sending message From Doctor Back-End ${error}`});
    }
}



const patientGetMessages = async (req,res)=>{
    try{

        const userId = req.user;
        const doctorId = req.params.doctorId;

        const messages = await Message.find({
            patientId:userId,
            doctorId:doctorId,
        }).populate('patientId').populate('doctorId');

        // console.log("Patient Messages",messages);

        return res.json({success:true,message:messages});


    }catch(error){
        console.log(`Error In Getting Messages: ${error}`);
        return res.json({success:false,message:`Error In Getting Messages (BackEnd): ${error}`})
    }
}



const doctorGetMessages = async (req,res)=>{
    try{

        const doctorId = req.doctor;

        const patientId = req.params.patientId;

        const messages = await Message.find({
            patientId:patientId,
            doctorId:doctorId,
        }).populate('patientId').populate('doctorId');

        console.log("Doctor Messages",messages);

        return res.json({success:true,message:messages});


    }catch(error){
        console.log(`Error In Getting Messages: ${error}`);
        return res.json({success:false,message:`Error In Getting Messages (BackEnd): ${error}`})
    }
}


export { doctorSendMessage, patientSendMessage, doctorGetMessages, patientGetMessages };