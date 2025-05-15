import React from 'react'


import { useState, useEffect, useContext } from 'react';



import './CSS/HomeContainer.css';

import { AdminContext } from '../context/AdminContext';



import { BookKey, NotebookPen  } from 'lucide-react';
import { toast } from 'react-toastify';

import moment from 'moment';


const HomeContainer = () => {

    const { backend_URL, appointmentData, fetchAppointments, appointmentCount, isAdminLoggedIn } = useContext(AdminContext);

    const [doctorCount,setDoctorCount] = useState(0);
    const [patientCount,setPatientCount] = useState(0);


    const fetchDoctorsCount = async()=>{
        try{    

            const fetchOptions = {
                method:"GET",
                credentials:"include"
            }

            const response = await fetch(`${backend_URL}/api/admin/getDoctors`,fetchOptions);
            const data = await response.json();

            if(data.success){
                setDoctorCount(data.message.length);
                // console.log(data.message.length);
            }else{
                console.log(data.message);
                toast.error(data.message);
            }


        }catch(error){
            console.log("Error in Fetching Doctor Count",error);
            toast.error(error);
        }
    }
     

    const fetchPatients = async()=>{

        try{

            const fetchOptions = {
                method:"GET",
                credentials:"include",
            }

            const response = await fetch(`${backend_URL}/api/admin/getPatients`,fetchOptions);
            const data = await response.json();
            // console.log(data);
            if(data.success){
                setPatientCount(data.message.length);
            }else{
                toast.error(data.message);
            }


        }catch(error){
            console.log("Error in Fetching Appointments",error);
            toast.error(error);
        }

    }


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
        fetchDoctorsCount();
        fetchAppointments();
        fetchPatients();
    },[]);




  return (
    <div className='home-container'>

        <div className="heading-container">

            <div className="item">

                <div className="image"> <img src="/doctor.png" alt="" /> </div>
                <div className="num">
                    <span> {doctorCount} </span>
                    <p>Doctors</p>
                </div>

            </div>

            <div className="item">

                <div className="image"> <BookKey size={50}/> </div>
                <div className="num">
                    <span> { appointmentCount  } </span>
                    <p>Appointments</p>
                </div>

            </div>

            <div className="item">

                <div className="image"> <img src="/user.png" alt="" style={{position:"relative",right:'10px',top:'5px'}} /> </div>
                <div className="num">
                    <span> {patientCount}  </span>
                    <p>Patients</p>
                </div>

            </div>

        </div>

        <div className="appointments">

            <div className="heading">
                <div className="heading-icon"> <NotebookPen /> </div>
                <p> Latest Appointment </p>
            </div>

            {/* <div className="element1">
                <div className="image"> <img src="/user.png" alt="user" /> </div>
                <div className="details"> <p> Dr. Richard Parker </p> <p> Booking On 24th July, 2024 </p> </div>
                <button> X </button>
            </div>
            <div className="element1">
                <div className="image"> <img src="/user.png" alt="user" /> </div>
                <div className="details"> <p> Dr. Richard Parker </p> <p> Booking On 24th July, 2024 </p> </div>
                <button> X </button>
            </div>
            <div className="element1">
                <div className="image"> <img src="/user.png" alt="user" /> </div>
                <div className="details"> <p> Dr. Richard Parker </p> <p> Booking On 24th July, 2024 </p> </div>
                <button> X </button>
            </div>
            <div className="element1">
                <div className="image"> <img src="/user.png" alt="user" /> </div>
                <div className="details"> <p> Dr. Richard Parker </p> <p> Booking On 24th July, 2024 </p> </div>
                <button> X </button>
            </div> */}

            {
                appointmentData?.slice(0,5).map((appointment,ind)=>{

                    if(!appointment.cancelled && !appointment.completed){

                        return(
                            <div className="element1" key={appointment._id}>
                                <div className="image"> <img src={ appointment.doctor.profilePic ||  "/user.png"} alt="user" /> </div>
                                <div className="details"> <p> {  appointment.doctor.fullName || "Dr. Richard Parker"} </p> <p> Booking On {moment(`${appointment.slotDate}`, "YYYY-MM-DD").format("Do MMMM, YYYY")} </p> </div>
                                <button onClick={()=>{cancelAppointment(appointment._id)}}> X </button>
                            </div> 
                        )
                        
                    }

                })
            }

        </div>

    </div>
  )
}

export default HomeContainer