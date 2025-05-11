import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({ 

    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"patient",
        required:true,
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"doctor",
        required:true,
    },
    slotDate:{
        type:String,
        required:true,
    },
    slotTime:{
        type:String,
        required:true,
    },
    fees:{
        type:Number,
        required:true,
    },
    paymentMode:{
        type:String,
        enum:['CASH','ONLINE'],
        default:'CASH',
    },    
    paymentStatus:{
        type:String,
        enum:['pending','done'],
        default:'pending',
    },
    dateCreated:{
        type:String,        // Number
        required:true,
    },
    cancelled:{
        type:Boolean,
        default:false,
    },
    completed:{
        type:Boolean,
        default:false,
    }

    

},{timestamps:true});




const Appointment = mongoose.models.appointment || mongoose.model('appointment',appointmentSchema);

export default Appointment;
