import React from 'react'


import './CSS/PatientAppointment.css';


import AppointmentInfo from '../Components/PatientAppointmentComponent/AppointmentInfo';
import Footer from '../Components/Footer';


import { useState, useEffect, useRef, useContext } from 'react';

import { AppContext } from '../Contexts/AppContext';

import { toast } from 'react-toastify';


const PatientAppointment = () => {


  const { backend_URL, patientData } = useContext(AppContext);

  const [appointments,setAppointments] = useState([]);

  const [cancelledAppointment,setCancelledAppointment] = useState(false);
  const [completedAppointment,setCompletedAppointment] = useState(false);

  const goTop = useRef(null);

    useEffect(()=>{
      goTop.current?.scrollIntoView({behavior:"smooth"});
    },[]);



    const fetchAppointments = async ()=>{
      try{

        const fetchOptions = {
          method:"GET",
          credentials:"include"
        }

        const response = await fetch(`${backend_URL}/api/patient/allAppointments`,fetchOptions);
        const data = await response.json();

        console.log(data);

        if(data.success){
  
          // console.log(data.appointments);
          
          // if(patientData){
          //   console.log(patientData);
          // }

          let tempAppointments = [];

          // Fetching the appointments of only that Patient

          data.appointments.forEach((apntment,ind)=>{
              // if(apntment.patient._id===patientData?._id){
              //   tempAppointments.push(apntment);
              // }

              if(apntment.cancelled){
                setCancelledAppointment(true);
              }
              if(apntment.completed){
                // console.log("Completed Entered");
                // console.log(apntment);
                setCompletedAppointment(true);
              }
          })

          console.log(tempAppointments);

          setAppointments(data.appointments);
          
        }else{
          console.log(`Error In Front-End Fetching Appointments ${error}`);
          toast.error(data.message);
        }

      }catch(error){
        console.log("Error In Front-End Fetching Appointments",error);
        toast.error(`Error In Front-End Fetching Appointments ${error}`);
      }
    }


    useEffect(()=>{ 
       fetchAppointments();
    },[patientData]);




    
    




  return (
    <>
      <h1 ref={goTop}> My Appointments </h1>

      <div className="keepContainer">
        {
          appointments.map((appointment,ind)=>{
            if(!appointment.cancelled && !appointment.completed){
              return(
                <AppointmentInfo key={appointment._id}  name={appointment.doctor.fullName } profilePic={ appointment.doctor.profilePic } speciality={ appointment.doctor.speciality } address={ appointment.doctor.address } date={ appointment.slotDate } time={ appointment.slotTime } cancel={ appointment.cancelled } appointmentId={appointment._id} paymentStatus={appointment.paymentStatus} completed={appointment.completed} />
              )
            }
            // else{
            //    setCancelledAppointment(true);
            // }
          })
        }
        {
          appointments.length==0 &&
          <h1> You Don't Have Any Appointment Booked </h1>
        }

      </div>



      <div className="keepContainer">


      {
          completedAppointment &&
          <h1>  Completed Appointments   </h1>
        }

        {
          appointments.map((appointment,ind)=>{
            if(appointment.completed){
              return(
                <AppointmentInfo key={appointment._id}  name={appointment.doctor.fullName } profilePic={ appointment.doctor.profilePic } speciality={ appointment.doctor.speciality } address={ appointment.doctor.address } date={ appointment.slotDate } time={ appointment.slotTime } cancel={ appointment.cancelled } appointmentId={appointment._id} paymentStatus={appointment.paymentStatus} completed={appointment.completed} />
              )
            }
            // else{
            //    setCancelledAppointment(true);
            // }
          })
        }

      </div>



      <div className="keepContainer">

        {
          cancelledAppointment &&
          <h1>  Cancelled Appointments   </h1>
        }

        {
          
          appointments.map((appointment,ind)=>{
            if(appointment.cancelled){
              return(
                <AppointmentInfo key={appointment._id}  name={appointment.doctor.fullName } profilePic={ appointment.doctor.profilePic } speciality={ appointment.doctor.speciality } address={ appointment.doctor.address } date={ appointment.slotDate } time={ appointment.slotTime } cancel={ appointment.cancelled } id={appointment._id} paymentStatus={appointment.paymentStatus} completed={appointment.completed} />
              )
            }
          })
        }





      </div>

      <Footer/>

    </>
  )
}

export default PatientAppointment