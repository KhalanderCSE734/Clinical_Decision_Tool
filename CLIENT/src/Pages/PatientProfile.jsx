import React from 'react'


import './CSS/Profile.css'

import { useState, useContext } from 'react';


import { AppContext } from '../Contexts/AppContext';



import { CiEdit } from "react-icons/ci";


import { toast } from 'react-toastify';


import { Loader } from 'lucide-react';



const PatientProfile = () => {

  const [editState,setEditState] = useState(false);

  const { patientData, backend_URL, getAuthStatus }  = useContext(AppContext);

  const [isUploading,setIsUploading] = useState(false); // Loading State after clicking 'save' button 


  // console.log(patientData);

  const [editDetails,setEditDetails] = useState({
    fullName:patientData?.fullName || "" ,
    phoneNum:patientData?.phoneNum || "",
    address:{
      line1:patientData?.address?.line1 || "",
      line2:patientData?.address?.line2 || "",
    },
    gender:patientData?.gender || "",
    dateOfBirth:patientData?.dateOfBirth || "",
    profilePic:patientData?.profilePic || "",
  })



  const handleEditDetailsChange = (evt)=>{
    const name = evt.target.name;
    const value = evt.target.value;

    if(name=='line1'|| name=='line2'){

      setEditDetails((prev)=>{
        return {...prev,address:{...prev.address,[name]:value}};
      })

      return;
    }

    setEditDetails((prev)=>{
      return {...prev,[name]:value};
    })


  }


  const handleProfilePic = (evt)=>{

    const image = evt.target.files[0];

    if(!image){
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(image);

    reader.onload = async ()=>{
      const base64Image = reader.result;
      setEditDetails((prev)=>{
        return {...prev, profilePic: base64Image};
      })
    }


  }

  



  const handleFormSubmit = async(evt)=>{
    // console.log("Hello");
    // setEditState(false);

    if(!editDetails.phoneNum || !editDetails.address.line1 || !editDetails.gender || !editDetails.dateOfBirth || !editDetails.profilePic){
        toast.warn("All Fields Are Mandatory to Fill (Name is Optional) ");
        return;
    }

    try{

      setIsUploading(true);

      const fetchOptions = {
        method:"PUT",
        credentials:"include",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(editDetails),
      }

      const response = await fetch(`${backend_URL}/api/patient/changeProfile`,fetchOptions);
      const data = await response.json();

      if(data.success){
        toast.success(data.message);
        getAuthStatus();

      }else{
        console.log(`Error in Profile Update Handler Front-end ${data.message} `);
        toast.error(data.message);
      }


    }catch(error){
      console.log(`Error in Profile Update Handler Front-end ${error} `);
      toast.error(error);
    } finally{
      setIsUploading(false);
    }


    console.log(editDetails);
    setEditState(false);
  }



  

  return (
    <>
      <img src={ editDetails.profilePic || patientData?.profilePic || "/user.png"} alt="User" className='profilePic'/>

      <label htmlFor="editPic">
        <input type="file" name="profilePic" id="editPic" className='hidden' onChange={handleProfilePic} />
        
      {
        editState &&
        <div className="icon cursor-pointer text-3xl"> <CiEdit /> </div>
      }
      </label> 

      
      {
        editState ?
        <input type="text" name="fullName" id="name" placeholder='Edit Your Name' className='editDetail' value={editDetails.fullName} onChange={handleEditDetailsChange} />:
        <div className="ProfileName"> {patientData?.fullName} </div> 
      }

      <h3 className='profileContact'>Contact Information</h3>
      <div className="info">
        <span> Email id: </span>
        <p> {patientData?.email}</p>
      </div>
      <div className="info">
        <span> Phone: </span>
        
      {
        editState ?
        <input type="text" name="phoneNum" id="phone" placeholder='Edit Your Phone Number' className='editDetail' value={editDetails.phoneNum} onChange={handleEditDetailsChange} />:
        <p> { patientData?.phoneNum ? patientData.phoneNum :"+99 9999999999" } </p>
      }
      </div>
      <div className="info">
        <span> Address : </span>
        
      {
        editState ?
        <div className='flex flex-col'>
        
        <input type="text" name="line1" id="phone" className='editDetail' placeholder='line1' value={editDetails.address.line1} onChange={handleEditDetailsChange} />
        <input type="text" name="line2" id="phone" className='editDetail' placeholder='line2' value={editDetails.address.line2} onChange={handleEditDetailsChange} />

        </div> :
        <p> { patientData?.address ? `${patientData.address.line1}, ${patientData.address.line2}` : "BMSCE Basavangudi, Bengalore"} </p>
      }
      </div>
      <h3 className='profileContact'>Basic Information</h3>
      <div className="info">
        <span> Gender : </span>
        
      {
        editState ?
        <select name="gender" id="gender" value={editDetails.gender} onChange={handleEditDetailsChange} > 
          <option value=""> Not Selected </option>  
          <option value="Male"> Male </option>
          <option value="FeMale"> FeMale </option>
          <option value="Others"> Others </option>
         </select> :

        <p> {patientData?.gender} </p>

      }

      </div>
      <div className="info">
        <span> Birthday: </span>
        
      {
        editState ?
        <input type="date" name="dateOfBirth" id="date" value={editDetails.dateOfBirth} onChange={handleEditDetailsChange} />:
        <p> {patientData?.dateOfBirth} </p>
      }
      </div>
      
      {
        editState ?
        <>
        {
          !isUploading ?
          <button onClick={ handleFormSubmit } > Save Details </button>:
          <Loader className="size-10 animate-spin"/>
        }

        </>
        :
        <button onClick={()=>setEditState(true)}> Edit </button>
      }

    </>
  )
}

export default PatientProfile