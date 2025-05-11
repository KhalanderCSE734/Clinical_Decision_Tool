import React from 'react'


import '../CSS/AllAppointments.css';


import { useState, useRef, useEffect, useContext } from 'react';


import { AdminContext } from '../../context/AdminContext';


import moment from 'moment';

import { toast } from 'react-toastify';



const AllAppointments = () => {


  const { backend_URL, appointmentData,fetchAppointments } = useContext(AdminContext);



  
      const cancelAppointment = async(appointmentId)=>{
          try{
              // console.log(JSON.stringify(appointmentId));
              // console.log(appointmentId);
  
              const fetchOptions = {
                  method:"DELETE",
                  credentials:"include",
                  headers:{
                      "Content-Type":"application/json"
                  },
                  body:JSON.stringify({appointmentId}),
              }
  
              const response = await fetch(`${backend_URL}/api/admin/cancelAppointment`,fetchOptions);
              const data = await response.json();
  
              if(data.success){
                  toast.success(data.message);
                  fetchAppointments();
              }else{
                  toast.error(data.message);
              }
  
  
          }catch(error){
              console.log("Error in Cancelling Appointments",error);
              toast.error(error);
          }
      }
  






  useEffect(()=>{
    fetchAppointments();
  },[])



  return (
    <div className='appointment-container'>
        <h1> All Appointments </h1>

        <div className="parent-container">

        <div className="element">
                <div className="num" style={{position:"relative",right:"15px"}}> # </div>
                <div className="info" > Patient </div>
                <div className="department" style={{position:"relative",right:"45px"}}> Department </div>
                <div className="age" style={{position:"relative",right:"30px"}}> Age </div>
                <div className="date" style={{position:"relative",right:"40px"}}> Date & Time </div>
                <div className="info" style={{position:"relative",left:"50px"}}> Doctor </div>
                <div className="fees" > Fees </div>
                <div> Cancel </div>
            </div>
            {/* 
            cancelled
: 
false
createdAt
: 
"2025-05-08T12:50:43.975Z"
dateCreated
: 
"08-05-2025"
doctor
: 
{_id: '6817aa991761236725690843', fullName: 'Dr. Neha Patil', email: 'nehapatil@example.com', profilePic: 'https://res.cloudinary.com/dsk16aew0/image/upload/v1746381464/jwffwxxwz3asdljaqnui.png', speciality: 'Gynecologist', …}
fees
: 
100
patient
: 
{_id: '681a6d9705073fa99fc2a9eb', fullName: 'Mohammed Khalander', email: 'khalander@gmail.com', profilePic: 'https://res.cloudinary.com/dsk16aew0/image/upload/v1746562570/mr7an0jkjbnbvlk9vfry.jpg', gender: 'Male', …}
paymentMode
: 
"CASH"
paymentStatus
: 
"pending"
slotDate
: 
"2025-05-10"
slotTime
: 
"11:30 am"
updatedAt
: 
"2025-05-08T12:50:43.975Z"
__v
: 
0
_id
: 
"681ca8a398652ce0b6f2c5aa"
            
            */}
            
            
            {
                appointmentData?.map((appointment,ind)=>{
                    if(!appointment.cancelled && !appointment.completed)
                    return(
                      <div className="element" key={ appointment._id }>
                          <div className="num"> { ind + 1 } </div>
                          <div className="info"> <img src={ appointment.patient.profilePic ||  "/user.png"} alt="user" /> <p>  {appointment.patient.fullName}  </p> </div>
                          <div className="department"> {appointment.doctor.speciality} </div>
                          <div className="age"> { moment().diff(moment(appointment.patient.dateOfBirth, "YYYY-MM-DD"), 'years') || "N/A" } </div>
                          <div className="date"> {moment(`${appointment.slotDate}`, "YYYY-MM-DD").format("Do MMMM, YYYY")} , {appointment.slotTime}  </div>
                          <div className="info"> <img src={ appointment.doctor.profilePic ||  "/user.png"} alt="user" />  <p>  {appointment.doctor.fullName}  </p> </div>
                          <div className="fees pr-5"> { appointment.doctor.fees || "N/A"} </div>

                            {
                                appointment.cancelled == false ?

                                
                                <button onClick={()=>{ cancelAppointment(appointment._id) }} > X </button>:

                                <p> Cancelled </p>

                            }

                        </div>
                     )
                })
            
            }




            
            
            {/* {
                appointmentData?.map((appointment,ind)=>{
                    if(appointment.cancelled)
                    return(
                      <div className="element" key={ appointment._id }>
                          <div className="num"> { ind + 1 } </div>
                          <div className="info"> <img src={ appointment.patient.profilePic ||  "/user.png"} alt="user" /> <p>  {appointment.patient.fullName}  </p> </div>
                          <div className="department"> {appointment.doctor.speciality} </div>
                          <div className="age"> { moment().diff(moment(appointment.patient.dateOfBirth, "YYYY-MM-DD"), 'years') || "N/A" } </div>
                          <div className="date"> {moment(`${appointment.slotDate}`, "YYYY-MM-DD").format("Do MMMM, YYYY")} , {appointment.slotTime}  </div>
                          <div className="info"> <img src={ appointment.doctor.profilePic ||  "/user.png"} alt="user" />  <p>  {appointment.doctor.fullName}  </p> </div>
                          <div className="fees pr-5"> { appointment.doctor.fees || "N/A"} </div>

                            {
                                appointment.cancelled == false ?

                                
                                <button onClick={()=>{ cancelAppointment(appointment._id) }} > X </button>:

                                <p> Cancelled </p>

                            }

                        </div>
                     )
                })
            
            } */}






            {/* <div className="element">
                <div className="num"> 1 </div>
                <div className="info"> <img src="/user.png" alt="user" /> <p>   A very Big Name  </p> </div>
                <div className="department"> General Physician </div>
                <div className="age"> 28 </div>
                <div className="date"> 24th July 2025, 10:00 AM </div>
                <div className="info"> <img src="/user.png" alt="user" />  <p>   A very Big Name  </p> </div>
                <div className="fees pr-5"> $100 </div>
                <button> X </button>
            </div> */}


            
        </div>

    </div>
  )
}

export default AllAppointments