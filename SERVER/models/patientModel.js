import mongoose from 'mongoose';


const patientSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
        default:"",
    },
    gender:{
        type:String,
        enum:['Male','Female','Others',''],
        default:'',
    },
    dateOfBirth:{
        type:String,
        default:"Not Selected",
    },
    address:{
        type:Object,
        default:{
            line1:"",
            line2:""
        },
    },
    phoneNum:{
        type:String,
        default:"9999999999",
    }
},

{timestamps:true},
{minimize:false},

);



const Patient = mongoose.models.patient || mongoose.model('patient',patientSchema);


export default Patient;