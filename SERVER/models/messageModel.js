import mongoose from 'mongoose';

const messasgeSchema = new mongoose.Schema({ 

    // patientId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"patient",
    //     required:true,
    // },
    // doctorId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"doctor",
    //     required:true,
    // },

    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"patient",
        required:true,
    },
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"doctor",
        required:true,
    },

    text:{
        type:String,
        default:"",
    },
    image:{
        type:String,
        default:""
    },
    isSenderPatient:{
        type:Boolean,
        default:true,       // This can be either 'true' or 'false'
    }


},{timestamps:true});


const Message = mongoose.models.message || mongoose.model('message',messasgeSchema);

export default Message;