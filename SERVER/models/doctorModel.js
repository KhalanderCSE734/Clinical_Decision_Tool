import mongoose from 'mongoose';



const doctorSchema = new mongoose.Schema({
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
        // default:"",
        required:true, // It should be mandatory
    },
    speciality:{
        type:String,
        required:true,
    },
    degree:{
        type:String,
        required:true,
    },
    experience:{
        type:String,
        required:true,
    },
    about:{
        type:String,
        required:true,
    },
    available:{
        type:Boolean,
        default:true,
    },
    fees:{
        type:Number,
        required:true,
    },
    address:{
        type:Object,
        required:true,
    },
    date:{
        type:Number,
        required:true,
    },
    // slots_booked:{
    //     type:Object,
    //     default:{},
    // }
    // slots_booked:{
    //    type: [mongoose.Schema.Types.Mixed],
    //    default: []
    // }
    slots_booked: {
        type: [{
          date: { type: String }, // or Date if preferred
          time: { type: String }
        }],
        default: []
      }
},
{timestamps:true},
{minimize:false},
)


// And 'date' is 'when doctor is added'
// 'minimize:false' is because we are creating the empty object


const Doctor = mongoose.models.doctor || mongoose.model('doctor',doctorSchema);


export default Doctor;