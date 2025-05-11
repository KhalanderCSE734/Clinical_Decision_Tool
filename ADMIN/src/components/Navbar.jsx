import React from 'react'


import { useState, useContext } from 'react';

import { NavLink } from 'react-router-dom';


import './CSS/Navbar.css';

import { AdminContext } from '../context/AdminContext';

import { DoctorContext } from '../context/DoctorContext';


import { toast } from 'react-toastify';



const Navbar = () => {

  const { isAdminLoggedIn, setIsAdminLoggedIn, backend_URL, getAdminAuthStatus } = useContext(AdminContext);


  const { isDoctorLoggedIn, setIsDoctorLoggedIn, getDoctorAuthStatus, doctorData } = useContext(DoctorContext)


  const handleLogOut = async ()=>{

    try{
      if(isAdminLoggedIn){

        const fetchOptions = {
          method:"GET",
          credentials:'include'
        }
        
        const response = await fetch(`${backend_URL}/api/admin/logOut`,fetchOptions);
        const data = await response.json();
        
        if(data.success){
          toast.success(data.message);
          setIsAdminLoggedIn(false);
          getAdminAuthStatus();
        }else{
          toast.error(data.message);
        }
        
      }else{
        const fetchOptions = {
          method:"POST",
          credentials:'include'
        }
        
        console.log("Entered Doctor Log Out BEfore API");
        const response = await fetch(`${backend_URL}/api/doctor/logOut`,fetchOptions);
        const data = await response.json();
        console.log("Entered Doctor Log Out AFter API");
        
        if(data.success){
          toast.success(data.message);
          setIsDoctorLoggedIn(false);
          getDoctorAuthStatus();
          console.log(data);
        }else{
          toast.error(data.message);
        }
      }
      
    }catch(error){
      console.log(`Error in LogOut Function Front-End ADMIN/DOCTOR ${error}`);
      toast.error(`Error in LogOut Function Front-End ADMIN/DOCTOR ${error}`);
    }


  }



  // console.log("Hello");
  //   console.log(isDoctorLoggedIn);
  //   console.log(doctorData);
    // console.log(` ${  isDoctorLoggedIn && doctorData  &&  ` Hello {doctorData.fullName}` }  `);


  return (
    <>
    
    <div className="nav">

        <div className="logo-container">
          <div className="logo"> <img src="/Logo.png" alt="Logo" />  </div>
          <p> {isAdminLoggedIn ? "Admin" : "Doctor" } </p>
        </div>

        <p className='text-2xl' style={{fontWeight:'500'}}>
          {
            isDoctorLoggedIn && doctorData && ` Hello ${doctorData.fullName} `
          }
        </p>
        
        <button onClick={handleLogOut}>LogOut</button>

    </div>
    
    </>
  )
}

export default Navbar