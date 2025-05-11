import React from 'react'


import './CSS/DoctorCard.css';

import { useRef, useState, useEffect, useContext } from 'react';

import { AdminContext } from '../context/AdminContext';


import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';





const DoctorCard = ( {name="Dr. Richard",image="/doctor.png",speciality="General Physician", available=true, id='randomId'} ) => {



  const navigate =useNavigate();

  const deleteDoctor = useRef(null);

  const [doctorAvailable,setDoctorAvailable] = useState(available);

  const { backend_URL } = useContext(AdminContext);

  // console.log(id);


  const changeAvailability = async()=>{

    try{

      const fetchOptions = {
        method:"PUT",
        credentials:"include",
      }

      const response = await fetch(`${backend_URL}/api/admin/changeAvailability/${id}`,fetchOptions);
      const data = await response.json();

      if(data.success){
        // console.log(data.message);
        // console.log(data.available);
        setDoctorAvailable(data.available);
        toast.success(data.message);
        navigate('/allDoctor');
      }else{
        toast.error(data.message);
      }


    }catch(error){
        console.log("Error in Front-End Changin Doctor Availablity ",error);
        toast.error(error);
    }


  }


  const deleteTheDoctor = async()=>{
     try{

      const fetchOptions = {
        method:"DELETE",
        credentials:"include",
      }

      const response = await fetch(`${backend_URL}/api/admin/deleteDoctor/${id}`,fetchOptions);
      const data = await response.json();

      console.log(data);


      if(data.success){
        toast.success(data.message);
        setDoctorAvailable(available);
        navigate('/allDoctor');
      }else{
        console.log(data.message);
        toast.error(data.message);
      }



     }catch(error){
      console.log("Error in Front-End Deleting Doctor ",error);
      toast.error(error);
     }
  }





  return (
    <>
        <div className="doctor" >

            <div className="img">
                  <img src={image} alt="DoctorImage" />
            </div>
      
      
            <h2 className="name"> {name} </h2>
            <p className="speciality"> {speciality} </p>

            <div className="available">
              {
                doctorAvailable ?
                <>
                  <span className='dot' onClick={changeAvailability}> </span>
                  <span> Available </span>
                </>
                :
                <>
                  <span className='dot' style={{backgroundColor:"red"}} onClick={changeAvailability} > </span>
                  <span className='text-red-500'> Un-Available </span>
                </>
                
              }


              <div onMouseOver={()=>{ deleteDoctor.current.style.opacity = "1" }} onMouseLeave={()=>{ deleteDoctor.current.style.opacity = "0" }} onClick={deleteTheDoctor}  >  X  </div>
              <p ref={deleteDoctor}> Delete Doctor </p>

            </div>
            
        </div>
    </>
  )
}

export default DoctorCard