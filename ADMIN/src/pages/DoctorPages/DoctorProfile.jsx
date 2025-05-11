import React from "react";

import "../CSS/DoctorProfile.css";

import { useState, useEffect, useContext } from "react";

import { DoctorContext } from '../../context/DoctorContext';

import { CiEdit } from "react-icons/ci";

import { toast } from "react-toastify";

import { Loader } from 'lucide-react';


const DoctorProfile = () => {


  const [editState,setEditState] = useState(false);

  const { backend_URL, doctorData, getDoctorAuthStatus } = useContext(DoctorContext);

 const [isUploading,setIsUploading] = useState(false); // Loading State after clicking 'save' button 


    const [editDetails,setEditDetails] = useState({
      fullName:doctorData?.fullName || "" ,
      address:{
        line1:doctorData?.address?.line1 || "",
        line2:doctorData?.address?.line2 || "",
      },
      fees:doctorData?.fees || "",
      about:doctorData?.about || "",
      profilePic:doctorData?.profilePic || "",
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

    // if(!editDetails.fees || !editDetails.address.line1 || !editDetails.profilePic || !editDetails.about){
    //     toast.warn("All Fields Are Mandatory to Fill ");
    //     return;
    // }
        evt.preventDefault();

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

      const response = await fetch(`${backend_URL}/api/doctor/updateProfile`,fetchOptions);
      const data = await response.json();

      if(data.success){
        toast.success(data.message);
        getDoctorAuthStatus();
      }else{
        console.log(`Error in Doctor Profile Update Handler Front-end ${data.message} `);
        toast.error(data.message);
      }


    }catch(error){
      console.log(`Error in Doctor Profile Update Handler Front-end ${error} `);
      toast.error(error);
    } finally{
      setIsUploading(false);
    }


    // console.log(editDetails);
    setEditState(false);
  }






  return (
    <div className="doctor-profile">
      <h1> Profile Page </h1>

      <img
        src={editDetails.profilePic || doctorData?.profilePic || "/user.png"}
        alt="User"
        className="profilePic"
      />

      <label htmlFor="editPic">
        <input
          type="file"
          name="profilePic"
          id="editPic"
          className="hidden"
          onChange={handleProfilePic}
        />

        {editState && (
          <div className="icon cursor-pointer text-3xl w-2.5">
            <CiEdit />
          </div>
        )}
      </label>


        <div className="ProfileName"> {doctorData?.fullName}, <h1 style={{fontWeight:'400',display:'inline-block'}}>  {doctorData?.degree} </h1> </div>
        <div className="ProfileName"> {doctorData?.speciality}  <h1 style={{display:'inline-block', border:'2px solid green',width:'80px', height:'30px',borderRadius:'1rem',textAlign:'center'}}>  {doctorData?.experience} </h1>  </div>
        

      <h3 className="profileContact">Contact Information</h3>
      <div className="info">
        <span> Email id: </span>
        <p> {doctorData?.email}</p>
      </div>

      <div className="info">
        <span> Appointment Fees : </span>

        {editState ? (
          <input
            type="text"
            name="fees"
            id="phone"
            placeholder="Edit Your Fees"
            className="editDetail"
            value={editDetails.fees}
            onChange={handleEditDetailsChange}
          />
        ) : (
          <p>
            {doctorData?.fees
              ? doctorData.fees
              : "N/A"}
          </p>
        )}
      </div>

      <div className="info">
        <span> Address : </span>

        {editState ? (
          <div className="flex flex-col">
            <input
              type="text"
              name="line1"
              id="phone"
              className="editDetail"
              placeholder="line1"
              value={editDetails.address.line1}
              onChange={handleEditDetailsChange}
            />
            <input
              type="text"
              name="line2"
              id="phone"
              className="editDetail"
              placeholder="line2"
              value={editDetails.address.line2}
              onChange={handleEditDetailsChange}
            />
          </div>
        ) : (
          <p>
            {doctorData?.address
              ? `${doctorData.address.line1}, ${doctorData.address.line2}`
              : "BMSCE Basavangudi, Bengalore"}
          </p>
        )}
      </div>
      <h3 className="profileContact">Basic Information</h3>
      <div className="info">
        <span> About : </span>

        {editState ? (

            <textarea name="about" id="about" rows='10' cols='50' placeholder='Write About YourSelf' value={editDetails.about} onChange={handleEditDetailsChange}>
                
            </textarea>

        ) : (
          <p className="w-96"> {doctorData?.about} </p>
        )}
      </div>
     
      {editState ? (
        <>
          {!isUploading ? (
            <button onClick={handleFormSubmit}> Save Details </button>
          ) : (
            <Loader className="size-10 animate-spin" />
          )}
        </>
      ) : (
        <button onClick={() => setEditState(true)}> Edit </button>
      )}
    </div>
  );
};

export default DoctorProfile;
