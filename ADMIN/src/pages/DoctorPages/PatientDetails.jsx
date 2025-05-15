import React from 'react'

import { useState, useContext, useRef, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';


import { DoctorContext } from '../../context/DoctorContext'; 


import '../CSS/PatientDetails.css';



const PatientDetails = () => {


    const { patientId } = useParams();
    // console.log(patientId);

    const [patientDetailsBackEnd,setPatientDetailsBackEnd] = useState(null);  //patientDetailsBackEnd from backend
    

    const { backend_URL } = useContext(DoctorContext);

    
      const fetchPatientDetails = async (evt)=>{
        try{
    
            const fetchOptions = {
                method:"GET",
                credentials:"include"
            }
            
            const response = await fetch(`${backend_URL}/api/doctor/getPatientDetails/${patientId}`,fetchOptions);
            const data = await response.json();
            // console.log(data);
            if(data.success){
                setPatientDetailsBackEnd(data.message);
                // console.log(data);
            }else{
                toast.error(data.message);
            }
    
    
        }catch(error){
            console.log("Error In Front-End Fetching Patients Details ",error);
            toast.error(`Error In Front-End Handling Input of Patients ${error}`);
        }
      }
    
    
      useEffect(()=>{ 
            fetchPatientDetails();
      },[]);
    



    
 if(patientDetailsBackEnd){

 
  return (

       <div className='patient-details-container'>
        <div className="edit-button flex items-center justify-center">

        <h1 className='h-max' style={{border:'none'}}> Patient Details </h1>

        <div> {patientDetailsBackEnd?.patient.fullName} </div>
        </div>

      <div className='show-details'>



        <div className="pateint-input-container">

            <div className="feild-1">
                <p> Age : </p>
                <span> { patientDetailsBackEnd?.age || "N/A"} </span>
            </div>

            <div className="feild-1">
                <p> Gender : </p>
                <span>  { patientDetailsBackEnd?.gender || "N/A"} </span>
            </div>

         </div>

         


        <div className="pateint-input-container">

            <div className="feild-1">
                <p> Height (cm) : </p>
                <span>  { patientDetailsBackEnd?.height || "N/A"}  </span>
            </div>

            <div className="feild-1">
                <p> Weight (KG) : </p>
                <span>  { patientDetailsBackEnd?.weight || "N/A"}  </span>
            </div>

         </div>


        <div className="pateint-input-container">

            <div className="feild-1">
                <p> BMI </p>
                <span>  { patientDetailsBackEnd?.BMI || "N/A"} </span>
            </div>

            <div className="feild-1">
                <p> Diabetic Duration (In Years) </p>
                <span>  { patientDetailsBackEnd?.diabetes_duration || "N/A"}  </span>
            </div>

         </div>



       

        {/* <div className="pateint-input-container">

            <div className="feild">
                <p> HBA1C (In Percentage) </p>
                <input type="Number" name="hba1c" id="hba1c" placeholder='Enter hba1c' required value={patientDetails.hba1c} onChange={handleInputChange}/>
            </div>

            <div className="feild">
                <p> Fasting Blood Glucose Level (mg/dL) </p>
                <input type="Number" name="fasting_blood_glucose" id="fasting_blood_glucose" placeholder='Blood sugar after fasting' required value={patientDetails.fasting_blood_glucose} onChange={handleInputChange} />
            </div>

         </div> */}



         <h1> Bio-Chemical And Clinical Inputs </h1>

        <div className="pateint-input-container">

            <div className="feild-1">
                <p> HBA1C (In Percentage) :  </p>
                <span>  { patientDetailsBackEnd?.hba1c || "N/A"} </span>
            </div>

            <div className="feild-1">
                <p> Fasting Blood Glucose Level (mg/dL) :  </p>
                <span>  { patientDetailsBackEnd?.fasting_blood_glucose || "N/A"} </span>
            </div>

         </div>



       

        <div className="pateint-input-container">

            <div className="feild-1">
                <p> Postprandial Glucose (mg/dL) : </p>
                <span>  { patientDetailsBackEnd?.postprandial_glucose || "N/A"} </span>
            </div>

            <div className="feild-1">
                <p> C Peptide (ng/mL) : </p>
                <span>  { patientDetailsBackEnd?.c_peptide || "N/A"} </span>
            </div>

         </div>



       

        <div className="pateint-input-container">

            <div className="feild-1">
                <p> Systolic BP (mmHg) : </p>
                <span>  { patientDetailsBackEnd?.sbp || "N/A"} </span>
            </div>

            <div className="feild-1">
                <p> Diastolic BP (mmHg) : </p>
                <span>  { patientDetailsBackEnd?.dbp || "N/A"} </span>
            </div>

         </div>


        <h1> Lipid Profile Inputs </h1>


       

        <div className="pateint-input-container">

            <div className="feild-1">
                <p> Total Cholesterol (mg/dL) : </p>
                <span>  { patientDetailsBackEnd?.total_cholesterol || "N/A"} </span>
            </div>

            <div className="feild-1">
                <p> Triglycerides (mg/dL) : </p>
                <span>  { patientDetailsBackEnd?.triglycerides || "N/A"} </span>
            </div>

         </div>



       

        <div className="pateint-input-container">

            <div className="feild-1">
                <p> LDL Cholesterol (mg/dL) : </p>
                <span>  { patientDetailsBackEnd?.ldl_cholesterol || "N/A"} </span>
            </div>

            <div className="feild-1">
                <p> HDL cholesterol (mg/dL) : </p>
               <span>  { patientDetailsBackEnd?.hdl_cholesterol || "N/A"} </span>
            </div>

         </div>



            <h1> Kidney Function Inputs (Renal Markers) </h1>




       

        <div className="pateint-input-container">

            <div className="feild-1">
                <p> Serum Creatinine (mg/dL) : </p>
                <span> { patientDetailsBackEnd?.serum_creatinine || "N/A"} </span>
            </div>

            <div className="feild-1">
                <p> Estimated GFR (mL/min/1.73m²) : </p>
                <span> { patientDetailsBackEnd?.estimated_GFR || "N/A"} </span>
            </div>

         </div>



       

        <div className="pateint-input-container">

            <div className="feild-1">
                <p> Urinary Albumin Creatinine Ratio (mg/g) : </p>
                <span> { patientDetailsBackEnd?.urinary_albumin_creatinine_ratio || "N/A"} </span>
            </div>


         </div>



        

        <h1> Life Style Factors </h1>

       

        <div className="pateint-input-container">

            <div className="feild-1">
                <p>  Smoking Status : </p>
                <span> { patientDetailsBackEnd?.smoking_status || "N/A"} </span>
            </div>

            <div className="feild-1">
                <p> Alcohol Status : </p>
                <span> { patientDetailsBackEnd?.alcohol_consumption || "N/A"} </span>
            </div>

         </div>



         <h1> Medications Usage </h1>


{
    /**
     * age:"", 
    gender:"", 
    height:"", 
    weight:"", 
    BMI:"", 
    diabetes_duration:"", 
    hba1c:"", 
    fasting_blood_glucose:"", 
    postprandial_glucose:"", 
    c_peptide:"", 
    sbp:"", 
    dbp:"", 
    total_cholesterol:"", 
    triglycerides:"", 
    ldl_cholesterol:"", 
    hdl_cholesterol:"",
    serum_creatinine:"", 
    estimated_GFR:"", 
    urinary_albumin_creatinine_ratio:"", 
    smoking_status:"", 
    alcohol_consumption:"", 
    medications:"", 
    metformin_usage:"", 
    lipid_lowering_drugs:""
     */
}



       

        <div className="pateint-input-container">

            <div className="feild-1">
                <p> Medications : </p>
                <span> { patientDetailsBackEnd?.medications || "N/A"}  </span>
            </div>

            <div className="feild-1">
                <p>  Usag Of Metformin : </p>
                <span>  { patientDetailsBackEnd?.metformin_usage || "N/A"} </span>
            </div>

         </div>

       

        <div className="pateint-input-container">


            <div className="feild-1">
                <p> Usag Of Cholesterol Medications : </p>
                <span>  { (patientDetailsBackEnd?.lipid_lowering_drugs && "Yes") || "N/A"} </span>
            </div>

         </div>





{
  /**
   *   const [patientDetails,setPatientDetails] = useState({
    age:"", 
    gender:"", 
    height:"", 
    weight:"", 
    BMI:"", 

    diabetes_duration:"", 

    hba1c:"", 
    fasting_blood_glucose:"", 
    postprandial_glucose:"", 
    c_peptide:"", 
    sbp:"", 
    dbp:"", 

    total_cholesterol:"", 
    triglycerides:"", 
    ldl_cholesterol:"", 
    hdl_cholesterol:"",

    serum_creatinine:"", 
    estimated_GFR:"", 
    urinary_albumin_creatinine_ratio:"", 

    smoking_status:"", 
    alcohol_consumption:"", 

    medications:"", 
    metformin_usage:"", 
    lipid_lowering_drugs:""

  });
   */
}

      </div>



    {/* <Footer/> */}

    </div>

  )
  } else{
    return <h1> Patient Has Not Yet Filled His Details  </h1>
  }
}

export default PatientDetails