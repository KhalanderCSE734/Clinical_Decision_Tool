import React from 'react'

import '../CSS/AllDoctors.css';

import DoctorCard from '../../components/DoctorCard';

import { AdminContext } from '../../context/AdminContext';



import { useState, useContext, useEffect } from 'react';



import { toast } from 'react-toastify'; 



const AllDoctors = () => {



      const [doctors,setDoctors] = useState([]);

      const { backend_URL } = useContext(AdminContext);

  
  
      const fetchDoctors = async()=>{
          try{    
  
              const fetchOptions = {
                  method:"GET",
                  credentials:"include"
              }
  
              const response = await fetch(`${backend_URL}/api/admin/getDoctors`,fetchOptions);
              const data = await response.json();
  
              if(data.success){
                  setDoctors(data.message);
                  // console.log(data.message);
              }else{
                  console.log(data.message);
                  toast.error(data.message);
              }
  
  
          }catch(error){
              console.log("Error in Fetching Doctor Number",error);
              toast.error(error);
          }
      }
  
  
      useEffect(()=>{ 
          fetchDoctors();
      },[]);
  

  
  return (
    <div className='doctor-container'>
       <h1>All Doctors </h1>
       <div className="doctorContainer">
          {
            doctors.map((doctor,ind)=>{
               return (
                    <DoctorCard key={doctor._id} name={doctor.fullName} image={doctor.profilePic} speciality={doctor.speciality} available={doctor.available} id={doctor._id}/>
               )
            })
          }

          </div>
    </div>
  )
}

export default AllDoctors