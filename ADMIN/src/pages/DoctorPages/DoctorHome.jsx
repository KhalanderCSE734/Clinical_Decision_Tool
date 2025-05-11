import React from 'react'


import '../CSS/DoctorHome.css';


import { useContext, useState,useEffect, useRef } from 'react';


import { DoctorContext } from '../../context/DoctorContext';



import { BookKey, NotebookPen } from 'lucide-react';


import { FcMoneyTransfer, FcCheckmark } from "react-icons/fc";

import { ImCancelCircle } from "react-icons/im";


import moment from 'moment';





const DoctorHome = () => {

  const { allAppointments, getAllAppointments, onGoingAppointments, completedAppointments, cancelledAppointments, doctorData } = useContext(DoctorContext);



  const [earnings,setEarnings] = useState(0);
  const [patientsCount,setPatientsCount] = useState(0);
  const [appointmentsCount,setAppointmentsCount] = useState(0);


  const calculateDashBoardData = ()=>{
    let totalEarnings = 0;
    
    allAppointments?.forEach((app,ind)=>{
      if(app.completed || app.paymentStatus=='done'){
        totalEarnings = totalEarnings + app.fees;
      }
    })

    // console.log("Total Earnings of The Doctor is ",totalEarnings);


    let totalPatients = [];

    allAppointments?.forEach((app,ind)=>{
      if(!totalPatients.includes(app.patient._id)){
        totalPatients.push(app.patient._id);
      }
    })

    // console.log("Total Number of Patients is ",totalPatients.length);

    let totalNumberOfAppointments = allAppointments?.length;

    // let totalNumberOfAppointments = onGoingAppointments?.length + completedAppointments?.length;

    // console.log("The Total Number of Appointments are ",totalNumberOfAppointments);

    setEarnings(totalEarnings);
    setPatientsCount(totalPatients.length);
    setAppointmentsCount(totalNumberOfAppointments);

  }



  
  useEffect(()=>{
    getAllAppointments();
  },[]);
  



  useEffect(()=>{ 
    calculateDashBoardData();
  },[allAppointments]);




  return (
    <div className='doctor-home-container'>
        <h1> Doctor DashBoard </h1>

        <div className="heading-container">

            <div className="item">

                <div className="image" style={{fontSize:'3.5rem'}}> <FcMoneyTransfer /> </div>
                <div className="num">
                    <span> ₹ {earnings} </span>
                    <p> Earnings </p>
                </div>

            </div>

            <div className="item">

                <div className="image"> <BookKey size={50}/> </div>
                <div className="num">
                    <span> {appointmentsCount} </span>
                    <p>Appointments</p>
                </div>

            </div>

            <div className="item">

                <div className="image"> <img src="/user.png" alt="" style={{position:"relative",right:'10px',top:'5px'}} /> </div>
                <div className="num">
                    <span> {patientsCount}  </span>
                    <p>Patients</p>
                </div>

            </div>

        </div>



        <div className="heading">
                <div className="heading-icon"> <NotebookPen /> </div>
                <p> Latest Appointment </p>
        </div>


        <div className="appointments" style={{overflowY:'scroll',scrollBehavior:'smooth'}}>



           {

            onGoingAppointments?.length> 0 ?

              onGoingAppointments?.map((appointment,ind)=>{
                return(
                  <div className="element1" key={appointment._id} >
                    <div className="image"> <img src={ appointment.patient.profilePic || "/user.png"} alt="user" /> </div>
                    <div className="details"> <p>  { appointment.patient.fullName || "Dr. Richard Parker"} </p> <p> {moment(`${appointment.slotDate}`, "YYYY-MM-DD").format("Do MMMM, YYYY")} , {appointment.slotTime} </p> </div>
                    {/* <button> X </button> */}
                  </div> 
                )
              }) :

              <h1 style={{display:'grid',placeItems:'center', height:'100%'}}> There Is No Any OnGoing Appointment </h1>
           }


            {/* <div className="element1" >
                <div className="image"> <img src="/user.png" alt="user" /> </div>
                <div className="details"> <p>  "Dr. Richard Parker" </p> <p> Booking On 24th March, 2025 on 10:30 AM </p> </div>
                <button> X </button>
            </div>  */}


        </div>


        <div className="heading">
           <div className="heading-icon" style={{fontSize:'2.5rem'}}> <FcCheckmark /> </div>
           <p> Completed Appointments </p>
        </div>


        <div className="appointments" style={{overflowY:'scroll',scrollBehavior:'smooth'}}>

          {
            completedAppointments?.length > 0 ?

            
            completedAppointments?.map((appointment,ind)=>{
                return(
                  <div className="element1" key={appointment._id} >
                  <div className="image"> <img src={ appointment.patient.profilePic || "/user.png"} alt="user" /> </div>
                  <div className="details"> <p>  { appointment.patient.fullName || "Dr. Richard Parker"} </p> <p> {moment(`${appointment.slotDate}`, "YYYY-MM-DD").format("Do MMMM, YYYY")} , {appointment.slotTime} </p> </div>
                  {/* <button> X </button> */}
                </div> 
                )
              })
            :

           <h1 style={{display:'grid',placeItems:'center', height:'100%'}}> There is no Completed Appointment </h1>

          }

         </div>



         <div className="heading mt-5">
           <div className="heading-icon" style={{fontSize:'1.8rem',color:'red'}}> <ImCancelCircle /> </div>
           <p> Cancelled Appointments </p>
        </div>


        <div className="appointments" style={{overflowY:'scroll',scrollBehavior:'smooth', height:'max-content'}}>

          {
            cancelledAppointments?.length > 0 ?

            
            cancelledAppointments?.map((appointment,ind)=>{
                return(
                  <div className="element1" key={appointment._id} >
                    <div className="image"> <img src={ appointment.patient.profilePic || "/user.png"} alt="user" /> </div>
                    <div className="details"> <p>  { appointment.patient.fullName || "Dr. Richard Parker"} </p> <p> {moment(`${appointment.slotDate}`, "YYYY-MM-DD").format("Do MMMM, YYYY")} , {appointment.slotTime} </p> </div>
                    {/* <button> X </button> */}
                  </div> 
                )
              })
            :

           <h1 style={{display:'grid',placeItems:'center', height:'100%'}}> There is no Cancelled Appointment </h1>

          }

         </div>

    </div>
  )
}

export default DoctorHome