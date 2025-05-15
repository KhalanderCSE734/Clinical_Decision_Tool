import mongoose from 'mongoose';


const PatientDetailsSchema = new mongoose.Schema({ 

    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"patient",
        required:true,
    },

    age:{
        type:Number,
        required:true,
    },
    gender:{
        type:String,
        enum:['Male','Femal','Others'],
        required:true,
    },
    height:{
        type:Number,
        required:true,
    },
    weight:{
        type:Number,
        required:true,
    },
    BMI:{
        type:Number,
        required:true,
    }, // 5


    diabetes_duration:{
        type:Number,
        required:true,
    },  // 1


    hba1c:{
        type:Number,
        required:true,
    },
    fasting_blood_glucose:{     
        type:Number,
        required:true,
    },
    postprandial_glucose:{
        type:Number,
        required:true
    },
    c_peptide:{
        type:Number,
        required:true
    },
    sbp:{       // systolic BP
        type:Number,
        required:true
    },
    dbp:{       //diastolic BP
        type:Number,
        required:true
    },  // 6


    total_cholesterol:{
        type:Number,
        required:true,
    },
    triglycerides:{
        type:Number,
        required:true,
    },
    ldl_cholesterol:{
        type:Number,
        required:true,
    },
    hdl_cholesterol:{
        type:Number,
        required:true,
    },  // 4


    serum_creatinine:{
        type:Number,
        required:true,
    },
    estimated_GFR:{ 
        type:Number,
        required:true,
    },
    urinary_albumin_creatinine_ratio:{
        type:Number,
        required:true,
    },  // 3


    smoking_status:{
        type:Boolean,
        required:true,
    },
    alcohol_consumption:{
        type:Boolean,
        required:true,
    },  // 2


    medications:{       // "Metformin", "Insulin", "Statins"
        type:String,
        required:true,
    },
    metformin_usage:{
        type:Boolean,
        required:true,
    },
    lipid_lowering_drugs:{
        type:Boolean,
        required:true,
    } // 3


    



},{timestamps:true});


const PatientDetails = mongoose.models.patientDetail || mongoose.model('patientDetail',PatientDetailsSchema);

export default PatientDetails;