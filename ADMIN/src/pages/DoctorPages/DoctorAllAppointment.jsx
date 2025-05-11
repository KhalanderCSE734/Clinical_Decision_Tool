import React from 'react'

import '../CSS/DoctorAllAppointment.css';


import { useContext,useEffect } from 'react';

import { DoctorContext } from '../../context/DoctorContext';



import { Check } from 'lucide-react';

import moment from 'moment';

import { toast } from 'react-toastify';



const DoctorAllAppointment = () => {


  const { getAllAppointments, allAppointments, onGoingAppointments, doctorData, backend_URL } = useContext(DoctorContext);


  useEffect(()=>{ 
    getAllAppointments();
    // console.log(allAppointments);
    // console.log(allAppointments[0]?.patient?.fullName);
    // console.log(onGoingAppointments);
    // console.log(moment().diff(moment(onGoingAppointments[0]?.patient.dateOfBirth, "YYYY-MM-DD")));
    // console.log(onGoingAppointments[0]?.patient.dateOfBirth);
      //  console.log(moment().diff(moment(onGoingAppointments[0]?.patient.dateOfBirth, 'YYYY-MM-DD'), 'years'));
  },[]);



  const completeAppointment = async (appointmentId)=>{

    try{  

      const fetchOptions = {
        method:"PUT",
        credentials:"include",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({ appointmentId }),
      }

      const response = await fetch(`${backend_URL}/api/doctor/completeAppointment`,fetchOptions);
      const data = await response.json();

      if(data.success){
        toast.success(data.message);
        getAllAppointments();
      }else{
        toast.error(data.message);
      }

    }catch(error){
      console.log("Error In Complete Appointment Front-End ",error);
      toast.error(`Error In Complete Appointment Front-End , ${error}`);
    }
    
  }



  
  const cancelAppointment = async (appointmentId)=>{

    // console.log(appointmentId);

    try{  

      const fetchOptions = {
        method:"PUT",
        credentials:"include",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({ appointmentId }),
      }

      const response = await fetch(`${backend_URL}/api/doctor/cancelAppointment`,fetchOptions);
      const data = await response.json();

      if(data.success){
        toast.success(data.message);
        getAllAppointments();
      }else{
        toast.error(data.message);
      }

    }catch(error){
      console.log("Error In Complete Appointment Front-End ",error);
      toast.error(`Error In Complete Appointment Front-End , ${error}`);
    }
    
  }



   
  return (
    <div className='doctor-appointment'>
        <h1> All Appointments of doctor </h1>
        {/* {
          allAppointments&&
          allAppointments[0]?.patient.fullName
        } */}


        <div className="doctor-parent-container">

           <div className="element">
                <div className="num" > # </div>
                <div className="info" > Patient </div>
                <div className="pay" > Payment </div>
                <div className="age" > Age </div>
                <div className="date" > Date & Time </div>
                <div className="fees" > Fees </div>
                <div className='pl-16'> Action </div>
            </div>


          {
            onGoingAppointments&&
            onGoingAppointments.map((appointment,ind)=>{
                if(!appointment.cancelled && !appointment.completed){
                  return (
                    <div className="element" key={appointment._id}>
                        <div className="num"> {ind+1} </div>
                        <div className="info"> <img src={ appointment.patient.profilePic ||  "/user.png"} alt="user" /> <p>   {appointment.patient.fullName}  </p> </div>
                        <div className="pay" style={{padding:'5px',borderRadius:'1rem',border:'1px solid black',width:'75px',textAlign:'center'}}> {appointment.paymentMode} </div>
                        <div className="age" style={{position:'relative',left:'25px'}}> { moment().diff(moment(appointment.patient.dateOfBirth, "YYYY-MM-DD"), 'years') || "N/A" } </div>
                        <div className="date" style={{position:'relative',left:'25px'}}> {moment(`${appointment.slotDate}`, "YYYY-MM-DD").format("Do MMMM, YYYY")} , {appointment.slotTime} </div>
                        <div className="fees pr-5" style={{position:'relative',left:'25px'}}> {appointment.fees} </div>
                        <div className='flex gap-2 pl-10 justify-between' style={{position:'relative',left:'25px',width:'10%'}}> 
                          <div className="complete" style={{color:'green',backgroundColor:'greenyellow',padding:'5px 5px',borderRadius:'50%',display:'grid',placeItems:'center'}} onClick={()=>{ completeAppointment(appointment._id) }} > <Check />  </div>  
                          <div className="cancel" style={{color:'white',backgroundColor:'rgb(228, 31, 21)',padding:'10px 10px',borderRadius:'50%',fontSize:'1.1rem',position:'relative',left:'10px'}} onClick={()=>{ cancelAppointment(appointment._id) }} > X </div>
                        </div>
                    </div>
                  )
                }
            })
          }





        </div>



    </div>
  )
}

export default DoctorAllAppointment