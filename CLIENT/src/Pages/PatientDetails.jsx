import React from 'react'


import { useState, useEffect, useContext, useRef } from 'react';

import { AppContext } from '../Contexts/AppContext';


import { toast } from 'react-toastify';


import './CSS/PatientDetails.css';


import Footer from '../Components/Footer';



const PatientDetails = () => {


    const { patientData, backend_URL } = useContext(AppContext);


  const [editState,setEditState] = useState(false);

  const [patientDetailsBackEnd,setPatientDetailsBackEnd] = useState([]);  //patientDetailsBackEnd from backend


  const [patientDetails,setPatientDetails] = useState({
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



  const handleInputChange = (evt)=>{
    const name = evt.target.name;
    const value = evt.target.value;

    setPatientDetails((prev)=>{
      return {...prev,[name]:value};
    })

  }

  const handleSubmit = async(evt)=>{
    evt.preventDefault();
    
    try{

      console.log(patientDetails);

        const fetchOptions = {
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(patientDetails),
        }


        


        const response = await fetch(`${backend_URL}/api/patient/regesterDetails`,fetchOptions);
        const data = await response.json();

        if(data.success){
            toast.success(data.message);
            fetchPatientDetails();
        }else{
            console.log(`Error In submiting patient Details Front-End ${data.message}`);
            toast.error(data.message);
        }



    }catch(error){
      console.log("Error In Front-End Handling Input of Patients ",error);
      toast.error(`Error In Front-End Handling Input of Patients ${error}`);
    }

    setEditState(false);

  }


  const fetchPatientDetails = async (evt)=>{
    try{

        const fetchOptions = {
            method:"GET",
            credentials:"include"
        }
        
        const response = await fetch(`${backend_URL}/api/patient/getPatientInputDetails`,fetchOptions);
        const data = await response.json();
        console.log(data);
        if(data.success){
            setPatientDetailsBackEnd(data.message[0]);
            console.log(data);
        }else{
            toast.error(data.message);
        }


    }catch(error){
        console.log("Error In Front-End Fetching Patients Details ",error);
        toast.error(`Error In Front-End Handling Input of Patients ${error}`);
    }
  }


  useEffect(()=>{ 
    // console.log(patientData);
    if(patientData?.isDetailsFilled){
        fetchPatientDetails();
    }
  },[patientData]);



//   if(editState){
  if(!patientData?.isDetailsFilled || editState){
    

  return (
    
    <div className='patient-details-container'>
        <div className="edit-button flex items-center justify-between" style={{padding:"0 10px",height:"60px"}}>

        <h1 className='h-max'> Patient Details </h1>

        {/* <button style={{margin:0,padding:0,height:"50px",width:"80px",textAlign:"center"}}> Edit </button> */}
        </div>

      <form onSubmit={handleSubmit}>



        <div className="pateint-input-container">

            <div className="feild">
                <p> Age </p>
                <input type="Number" name="age" id="age" placeholder='Enter Your Age' required value={patientDetails.age} onChange={handleInputChange}/>
            </div>

            <div className="feild">
                <p> Gender </p>
                {/* <input type="Number" name="fullName" id="name" placeholder='Name'/> */}
                <select name="gender" id="gender" value={patientDetails.gender} onChange={handleInputChange} required > 
                  <option value=""> Not Selected </option>  
                  <option value="Male"> Male </option>
                  <option value="FeMale"> FeMale </option>
                  <option value="Others"> Others </option>
                </select>
            </div>

         </div>

         


        <div className="pateint-input-container">

            <div className="feild">
                <p> Height </p>
                <input type="Number" name="height" id="height" placeholder='Enter Your Height' required value={patientDetails.height} onChange={handleInputChange}/>
            </div>

            <div className="feild">
                <p> Weight </p>
                <input type="Number" name="weight" id="weight" placeholder='Enter Your Weight' required value={patientDetails.weight} onChange={handleInputChange} />
            </div>

         </div>




        <div className="pateint-input-container">

            <div className="feild">
                <p> BMI </p>
                <input type="Number" name="BMI" id="BMI" placeholder='Enter Your Body Mass Index' required value={patientDetails.BMI} onChange={handleInputChange}/>
            </div>

            <div className="feild">
                <p> Diabetic Duration (In Years) </p>
                <input type="Number" name="diabetes_duration" id="diabetes_duration" placeholder='Enter Your Diabetes Duration' required value={patientDetails.diabetes_duration} onChange={handleInputChange} />
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

            <div className="feild">
                <p> HBA1C (In Percentage) </p>
                <input type="Number" name="hba1c" id="hba1c" placeholder='Enter hba1c' required value={patientDetails.hba1c} onChange={handleInputChange}/>
            </div>

            <div className="feild">
                <p> Fasting Blood Glucose Level (mg/dL) </p>
                <input type="Number" name="fasting_blood_glucose" id="fasting_blood_glucose" placeholder='Blood sugar after fasting' required value={patientDetails.fasting_blood_glucose} onChange={handleInputChange} />
            </div>

         </div>



       

        <div className="pateint-input-container">

            <div className="feild">
                <p> Postprandial Glucose (mg/dL) </p>
                <input type="Number" name="postprandial_glucose" id="postprandial_glucose" placeholder='Enter Postprandial Glucose' required value={patientDetails.postprandial_glucose} onChange={handleInputChange}/>
            </div>

            <div className="feild">
                <p> C Peptide (ng/mL) </p>
                <input type="Number" name="c_peptide" id="c_peptide" placeholder='C Peptide' required value={patientDetails.c_peptide} onChange={handleInputChange} />
            </div>

         </div>



       

        <div className="pateint-input-container">

            <div className="feild">
                <p> Systolic BP (mmHg) </p>
                <input type="Number" name="sbp" id="sbp" placeholder='Enter Systolic BP' required value={patientDetails.sbp} onChange={handleInputChange}/>
            </div>

            <div className="feild">
                <p> Diastolic BP (mmHg) </p>
                <input type="Number" name="dbp" id="dbp" placeholder='Enter Diastolic BP' required value={patientDetails.dbp} onChange={handleInputChange} />
            </div>

         </div>


        <h1> Lipid Profile Inputs </h1>




       

        <div className="pateint-input-container">

            <div className="feild">
                <p> Total Cholesterol (mg/dL) </p>
                <input type="Number" name="total_cholesterol" id="total_cholesterol" placeholder='Enter Total Cholesterol Level' required value={patientDetails.total_cholesterol} onChange={handleInputChange}/>
            </div>

            <div className="feild">
                <p> Triglycerides (mg/dL) </p>
                <input type="Number" name="triglycerides" id="triglycerides" placeholder='Enter Triglycerides' required value={patientDetails.triglycerides} onChange={handleInputChange} />
            </div>

         </div>



       

        <div className="pateint-input-container">

            <div className="feild">
                <p> LDL Cholesterol (mg/dL) </p>
                <input type="Number" name="ldl_cholesterol" id="ldl_cholesterol" placeholder='Enter The Level of Bad Cholesterol' required value={patientDetails.ldl_cholesterol} onChange={handleInputChange}/>
            </div>

            <div className="feild">
                <p> HDL cholesterol (mg/dL) </p>
                <input type="Number" name="hdl_cholesterol" id="hdl_cholesterol" placeholder='Enter The Level of Good Cholesterol' required value={patientDetails.hdl_cholesterol} onChange={handleInputChange} />
            </div>

         </div>



            <h1> Kidney Function Inputs (Renal Markers) </h1>




       

        <div className="pateint-input-container">

            <div className="feild">
                <p> Serum Creatinine (mg/dL) </p>
                <input type="Number" name="serum_creatinine" id="serum_creatinine" placeholder='Enter Serum Creatinine Level' required value={patientDetails.serum_creatinine} onChange={handleInputChange}/>
            </div>

            <div className="feild">
                <p> Estimated GFR (mL/min/1.73m²) </p>
                <input type="Number" name="estimated_GFR" id="estimated_GFR" placeholder='Enter Estimated GFR Rate' required value={patientDetails.estimated_GFR} onChange={handleInputChange} />
            </div>

         </div>



       

        <div className="pateint-input-container">

            <div className="feild">
                <p> Urinary Albumin Creatinine Ratio (mg/g) </p>
                <input type="Number" name="urinary_albumin_creatinine_ratio" id="urinary_albumin_creatinine_ratio" placeholder='Enter Urinary Albumin Creatinine Ratio' required value={patientDetails.urinary_albumin_creatinine_ratio} onChange={handleInputChange}/>
            </div>


         </div>



        

        <h1> Life Style Factors </h1>

       

        <div className="pateint-input-container">

            <div className="feild">
                <p> Do You Smoke </p>
                <select name="smoking_status" id="smoking_status" value={patientDetails.smoking_status} onChange={handleInputChange} required> 
                  <option value=""> Not Selected </option>  
                  <option value="true"> Yes </option>
                  <option value="false"> No </option>
                </select>
            </div>

            <div className="feild">
                <p> Do You Consume Alcohol </p>
                <select name="alcohol_consumption" id="alcohol_consumption" value={patientDetails.alcohol_consumption} onChange={handleInputChange} required> 
                  <option value=""> Not Selected </option>  
                  <option value="true"> Yes </option>
                  <option value="false"> No </option>
                </select>
            </div>

         </div>



         <h1> Medications Usage </h1>

       

        <div className="pateint-input-container">

            <div className="feild">
                <p> Medications </p>
                <select name="medications" id="medications" value={patientDetails.medications} onChange={handleInputChange} required > 
                  <option value=""> Not Selected </option>  
                  <option value="Metformin"> Metformin </option>
                  <option value="Insulin"> Insulin </option>
                  <option value="Statins"> Statins </option>
                </select>
            </div>

            <div className="feild">
                <p> Do You Use Metformin </p>
                <select name="metformin_usage" id="metformin_usage" value={patientDetails.metformin_usage} onChange={handleInputChange} required > 
                  <option value=""> Not Selected </option>  
                  <option value="true"> Yes </option>
                  <option value="false"> No </option>
                </select>
            </div>

         </div>

       

        <div className="pateint-input-container">


            <div className="feild">
                <p> Do You Use Cholesterol Medications </p>
                <select name="lipid_lowering_drugs" id="lipid_lowering_drugs" value={patientDetails.lipid_lowering_drugs} onChange={handleInputChange} required> 
                  <option value=""> Not Selected </option>  
                  <option value="true"> Yes </option>
                  <option value="false"> No </option>
                </select>
            </div>

         </div>




    <button style={{marginBottom:"10px",marginTop:"50px"}}> Submit Details </button>


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

      </form>



    <Footer/>

    </div>
  )


  } else{


 return (
    
    <div className='patient-details-container'>
        <div className="edit-button flex items-center justify-between" style={{padding:"0 10px",height:"60px"}}>

        <h1 className='h-max'> Patient Details </h1>

        <button style={{margin:0,padding:0,height:"50px",width:"80px",textAlign:"center"}} onClick={()=> setEditState(true)}> Edit </button>
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



    <Footer/>

    </div>
  )
    
  }


}

export default PatientDetails