import React from 'react'


import '../CSS/AppointmentInfo.css';


import { useState, useEffect, useRef, useContext } from 'react';

import { AppContext } from '../../Contexts/AppContext';


import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';



const AppointmentInfo = ({name="Vijaya N",profilePic="/user.png",speciality="General Physician",address={ line1:"37th Cross, Richmond",line2:"Circle, Ring Road, London" },date="28 May 2025",time="10:30 AM",cancel=false , appointmentId='randomeId', paymentStatus="pending", completed=false, doctorId="kamovnenvlse4567890" } ) => {


    const { backend_URL, getAuthStatus } = useContext(AppContext);

      // console.log(appointmentId);

      const navigate = useNavigate();


      const initiatePayment = (order)=>{

          const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency:order.currency,
            name:'Doctor Appointment PayMent',
            description: ' Creating Appointment Payment for the Doctor',
            order_id:order.id,
            receipt:order.receipt,
            handler: async (response)=>{
                try{
                  const fetchOptions = {
                    method:"POST",
                    credentials:"include",
                    headers:{
                      "Content-Type":"application/json",
                    },
                    body:JSON.stringify({response}),
                    }
        
                    const response = await fetch(`${backend_URL}/api/patient/verifyRazorPay`,fetchOptions);
                    const data = await response.json();
        
                    if(data.success){
                      navigate('/myAppointment');
                    }else{
                      console.log("Error in Initiating Payment in Front-End",data.message);
                      toast.error(data.message);
                    }
                }catch(error){
                  toast.error(error);
                }
            }
          }

          const razorPay = new window.Razorpay(options);
          razorPay.open();
      }



      const makePayment = async ()=>{
        try{

          const fetchOptions = {
            method:"POST",
            credentials:"include",
            headers:{
              "Content-Type":"application/json",
            },
            body:JSON.stringify({appointmentId}),
            }

            const response = await fetch(`${backend_URL}/api/patient/createOrderPayment`,fetchOptions);
            const data = await response.json();

            if(data.success){
              initiatePayment(data.order);
            }else{
              console.log("Error in Making Payment in Appointments",data.message);
              toast.error(data.message);
            }
        }catch(error){
          console.log("Error in Making Payment in Appointments",error);
          toast.error(error);          
        }

      }





  
      const cancelAppointment = async()=>{
          try{
             
              const fetchOptions = {
                  method:"DELETE",
                  credentials:"include",
                  headers:{
                      "Content-Type":"application/json"
                  },
                  body:JSON.stringify({appointmentId}),
              }

              const response = await fetch(`${backend_URL}/api/patient/cancelAppointment`,fetchOptions);
              const data = await response.json();

              if(data.success){
                  toast.success(data.message);
                  getAuthStatus();  // I'm calling this just to re-render the page;
              }else{
                  toast.error(data.message);
              }
  
  
          }catch(error){
              console.log("Error in Cancelling Appointments",error);
              toast.error(error);
          }
      }
  



  return (
    <div className='contain'>

        <div className="contain-img">
            <img src={profilePic} alt="doctor" />
        </div>

        <div className="docInfo">
            <h2 className="docInfo-name"> {name}  </h2>
            <h2 className="docInfo-speciality"> {speciality} </h2>
            <p>Address: </p>
            <div className="docInfo-address"> 
                {address.line1}, 
                {address.line2}
            </div>
            <div className="docInfo-date"> Date & Time: <span> {date} | {time} </span>  </div>
        </div>

        <div className="payment">

          {
            cancel?
            <button className='cancel' style={{marginBottom:"20px",color:"red",borderColor:"red"}}> Appointment Cancelled </button>:
            <>
            
            {
              paymentStatus=='pending'?
              <>
              <button className="pay"> Pay Online </button>
              <button className="pay" onClick={()=>navigate(`/messages/${doctorId}`)}> Message </button>
              </>:
              <button className="pay"> Paid </button>
              
            }

            {
              
              !completed ?
              
              <button className="cancel" onClick={()=>{ cancelAppointment() }}> Cancel Appointment </button>:
              <button className="app-complete"> Completed </button>

            }
            
            </>
          }
          
        </div>

    </div>
  )
}

export default AppointmentInfo  