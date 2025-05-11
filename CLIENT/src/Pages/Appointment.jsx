import React from 'react'




import { useRef, useEffect, useState, useContext } from 'react';



import { useNavigate, useParams } from 'react-router-dom';





import './CSS/Appointment.css'

import moment from 'moment';


import { BsPatchCheckFill } from 'react-icons/bs';
import { CiCircleInfo } from "react-icons/ci";






import DoctorCard from '../Components/HomeComponents/DoctorCard';
import Footer from '../Components/Footer';




import { doctors } from '../assets/assets_frontend/assets';

import { toast } from 'react-toastify';


import { AppContext } from '../Contexts/AppContext';






const Appointment = () => {


  const scrollRef = useRef(null);

  const goTop = useRef(null);


  const navigate =  useNavigate();


  const { doctorID } = useParams();


  // console.log(doctorID);




  const [selectedDay,setSelectedDay] = useState(null);
  const [selectedDate,setSelectedDate] = useState(null);
  const [selectedTime,setSelectedTime] = useState(null);

  const [dates,setDates] = useState([]);
  const [weekDays,setWeekDays] = useState([]);

  const [doctorSlots,setDoctorSlots] = useState([]);
  const [slotIndex,setSlotIndex] = useState(0);
  const [slotTime,setSlotTime] = useState('');


  const  getNext7Days = ()=> {
    // const days = [];
    // const weekdays = [];
    // const today = new Date();
  

    // const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // for (let i = 0; i < 7; i++) {
    //   const day = new Date(today);
    //   day.setDate(today.getDate() + i);
  
    //   // Format as YYYY-MM-DD
    //   const formatted = day.toISOString().split("T")[0];
    //   const weekday = weekdayNames[day.getDay()]
      
    //   days.push(formatted);
    //   weekdays.push(weekday);
    // }

    let date = "";
    let day = "";

    let date1 = [];
    let weekdays2 = [];


    for(let i=0;i<7;i++){
      date = moment().add(i, 'days');
      day = moment().add(i,'days');
      date1.push(date.format('YYYY-MM-DD'));
      weekdays2.push(day.format('ddd'));
    }

    console.log(date1);
    console.log(weekdays2);




    // console.log(days);
    // console.log(weekdays);
    setDates(date1);
    setWeekDays(weekdays2);
    
  }

  useEffect(() => {
    getNext7Days();
    console.log(dates); 
    console.log(weekDays);
  }, [])
  



  // const selectedDoctor = "";

  // const [selectedDoctor,setSelectedDoctor] =  useState(doctors.find((doctor,ind)=>{ return doctor._id == doctorID }));
  const [selectedDoctor,setSelectedDoctor] =  useState([]);
  const [doctorsList,setDoctorsList] = useState([]);
  

  // The above one Literally Worked, So no Need of Below one, But after user Select doctor from suggestion we have to update it so use the below one please


  /**
   
  
  * 
  */

  /**
   
  useEffect(()=>{ 
    setSelectedDoctor(   doctors.find((doctor,ind)=>{ return doctor._id == doctorID })  );
    // console.log(selectedDoctor);
    
    // OutPut of the Above is an Object
    
  },[doctorID]);
  
  * 
  */


      const { backend_URL, isPatientLoggedIn } = useContext(AppContext);

  
      const fetchDoctors = async()=>{
          try{
  
            const fetchOptions = {
              method:'GET',
              credentials:'include'
            } 
  
            const response = await fetch(`${backend_URL}/api/patient/allDoctors`,fetchOptions);
            const data = await response.json();
            if(data.success){
              // console.log(data.message);
              setDoctorsList(data.message);
              const doc = data.message.find((doctor,ind)=>{ return doctor._id == doctorID });
              // console.log(doc);
              setSelectedDoctor(doc);
              // console.log(doc);


            }else{
              toast.error(data.message);
            }
  
          }catch(error){
              console.log("Error in Fetching Doctors");
              toast.error(error);
          }
      }
  
  
      useEffect(()=>{
        fetchDoctors();

       },[doctorID]);
  
  



  
  useEffect(()=>{
    goTop.current?.scrollIntoView({behavior:"smooth"});
    setSelectedDay(null);
    setSelectedTime(null);
  },[doctorID]);
  
  


/**
 
useEffect(()=>{ 
  
  
  const ele = scrollRef.current;
  
  const handleWheel = (evt)=>{
    evt.preventDefault();
    ele.scrollLeft += evt.deltaY;
  }
  
  
  ele?.addEventListener("wheel",handleWheel, { passive:false });   // Passive false is to apply 'evt.preventDefault'
  
  return(
    ()=> ele?.removeEventListener("wheel",handleWheel)
  )
  
},[selectedDay]);


* 
*/

  
  const handleGoToParticularDoctor = (id)=>{
    navigate(`/appointment/${id}`);
  }


  const handleChangeSelect = (evt)=>{
    // console.log("CLicked");
    // console.log(evt.target);
    // console.log(evt.target.closest('p'));
    if(evt.target.closest('p')){
      console.log("Hello");
      // evt.target.closest('p').style.backgroundColor = "red";
      setSelectedTime(evt.target.closest('p').innerText);
    }
  }


  // const getAvailableSlots = (evt)=>{
  //   const today = new Date();
  //   console.log(today);
  //   for(let i=0;i<7;i++){
  //     let currentDate = new Date(today);
  //     console.log(today.getDate() + i);
  //     console.log((today.getDay() + i));
  //   }
  // }

  // useEffect(()=>{ 
  //   getAvailableSlots();
  // },[]);



  const handleBookAppointment = async ()=>{ 

    if(isPatientLoggedIn){
        // toast.success("You Can Book Appointment");

        const appointmentData = {
          doctorId:doctorID,
          slotDate:selectedDate,
          slotTime:selectedTime,
          fees:selectedDoctor.fees,
        }

        // console.log(selectedDate,selectedTime,doctorID,selectedDoctor.fees);

        try{
           const fetchOptions = {
            method:"POST",
            credentials:"include",
            headers:{
              'Content-Type':'application/json',
            },
            body:JSON.stringify(appointmentData),
           }

           const response = await fetch(`${backend_URL}/api/appointment/book-appointment`,fetchOptions);
           const data = await response.json();

           if(data.success){
            toast.success(data.message);
            navigate('/myAppointment');
           }else{
            console.log("Error In Book Appointment Front-End ",data.message);
            toast.error(data.message);
           }

        }catch(error){
          console.log("Error In Book Appointment Front-End ", error);
          toast.error(error);
        }

      }else{
        toast.success("Please Sign In To Book The Appointment");
        // toast.success(`${selectedDate},${selectedDay},${selectedTime}`);
    }
    

   }



  return (
    <>
    
     <div className="doctorInfo" ref={goTop}>

      <div className="DocImg">
          <img src={selectedDoctor.profilePic} alt="Doctor" />
      </div>

      <div className="DocInfo">
        <h1> {selectedDoctor.fullName}  <BsPatchCheckFill color="green" size={24} /> </h1>
        <div className="domain"> {selectedDoctor.degree} - {selectedDoctor.speciality}  <span> {selectedDoctor.experience} </span>   </div>
        <h4 className="abInfo"> About <CiCircleInfo /> </h4>
        <p> {selectedDoctor.about} </p>

        <div className="fee"> Appointment fees: <span>  ₹{selectedDoctor.fees} </span>  </div>

      </div>

     </div>


     <div className="slots">

      <div className="space">

      </div>
    {
      selectedDoctor.available ?


    
      <div className="right">

        <h3> Booking Slots </h3>

        <div className="days">
          <p className={`empty ${ (!selectedDay && !selectedTime) ? `bg-[#1F8E94]`: `bg-white` } `} onClick={()=>{ setSelectedDay(null); setSelectedTime(null) }}  >  </p>

          <p className={`day ${ (selectedDay==weekDays[0]) ? `bg-[#0dbbc4] text-white` : `bg-white` } `}  onClick={()=>{ setSelectedDay(weekDays[0]); setSelectedDate( dates[0] )}} > <span>  {weekDays[0]} </span>, <span>   {dates[0].split('-')[2]} </span> </p>
          <p className={`day ${ (selectedDay==weekDays[1]) ? `bg-[#0dbbc4] text-white` : `bg-white` } `}  onClick={()=>{ setSelectedDay(weekDays[1]); setSelectedDate(dates[1])}} > <span>  {weekDays[1]} </span>, <span>   {dates[1].split('-')[2]} </span> </p>
          <p className={`day ${ (selectedDay==weekDays[2]) ? `bg-[#0dbbc4] text-white` : `bg-white` } `}  onClick={()=>{ setSelectedDay(weekDays[2]); setSelectedDate(dates[2])}} > <span>  {weekDays[2]} </span>, <span>   {dates[2].split('-')[2]} </span> </p>
          <p className={`day ${ (selectedDay==weekDays[3]) ? `bg-[#0dbbc4] text-white` : `bg-white` } `}  onClick={()=>{ setSelectedDay(weekDays[3]); setSelectedDate(dates[3])}} > <span>  {weekDays[3]} </span>, <span>   {dates[3].split('-')[2]} </span> </p>
          <p className={`day ${ (selectedDay==weekDays[4]) ? `bg-[#0dbbc4] text-white` : `bg-white` } `}  onClick={()=>{ setSelectedDay(weekDays[4]); setSelectedDate(dates[4])}} > <span>  {weekDays[4]} </span>, <span>   {dates[4].split('-')[2]} </span> </p>
          <p className={`day ${ (selectedDay==weekDays[5]) ? `bg-[#0dbbc4] text-white` : `bg-white` } `}  onClick={()=>{ setSelectedDay(weekDays[5]); setSelectedDate(dates[5])}} > <span>  {weekDays[5]} </span>, <span>   {dates[5].split('-')[2]} </span> </p>

        </div>


        {
          selectedDay && 


        <div className="timings" ref={scrollRef} onClick={handleChangeSelect} onWheel={(evt)=>{ evt.preventDefault(); scrollRef.current.scrollLeft+= evt.deltaY  }}>
          <p className={selectedTime=='10:00 am'? `bg-[#0dbbc4] text-white`: `bg-white`}> 10:00 am </p>
          <p className={selectedTime=='10:30 am'? `bg-[#0dbbc4] text-white`: `bg-white`}> 10:30 am </p>
          <p className={selectedTime=='11:00 am'? `bg-[#0dbbc4] text-white`: `bg-white`}> 11:00 am </p>
          <p className={selectedTime=='11:30 am'? `bg-[#0dbbc4] text-white`: `bg-white`}> 11:30 am </p>
          <p className={selectedTime=='12:00 pm'? `bg-[#0dbbc4] text-white`: `bg-white`}> 12:00 pm </p>
          <p className={selectedTime=='12:30 pm'? `bg-[#0dbbc4] text-white`: `bg-white`}> 12:30 pm </p>
          <p className={selectedTime=='1:00 pm' ? `bg-[#0dbbc4] text-white`: `bg-white`}> 1:00 pm </p>
          <p className={selectedTime=='1:30 pm' ? `bg-[#0dbbc4] text-white`: `bg-white`}> 1:30 pm </p>
          <p className={selectedTime=='2:00 pm' ? `bg-[#0dbbc4] text-white`: `bg-white`}> 2:00 pm </p>
          <p className={selectedTime=='2:30 pm' ? `bg-[#0dbbc4] text-white`: `bg-white`}> 2:30 pm </p>
          <p className={selectedTime=='3:00 pm' ? `bg-[#0dbbc4] text-white`: `bg-white`}> 3:00 pm </p>
          <p className={selectedTime=='3:30 pm' ? `bg-[#0dbbc4] text-white`: `bg-white`}> 3:30 pm </p>
          <p className={selectedTime=='4:00 pm' ? `bg-[#0dbbc4] text-white`: `bg-white`}> 4:00 pm </p>
          <p className={selectedTime=='4:30 pm' ? `bg-[#0dbbc4] text-white`: `bg-white`}> 4:30 pm </p>
        </div>

        }

        <button className='btn' onClick={ handleBookAppointment }> Book Appointment </button>

      </div>

      :

      <div className="right" style={{textAlign:"center",fontSize:"40px",color:"orange"}}>
        Doctor Is Un Available, You Can't Book Appointment
      </div>

    }

     </div>
     

     <div className="suggestion-doctor">

        <h1>Related Doctors</h1>
        <p>Simply browse through our extensive list of trusted doctors.</p>
        
        <div className="doctorContainer">
              {
                // Array(2).fill(0).map((_,ind)=>{
                //   return( <DoctorCard key={ind}/> )
                // })

                doctorsList.map((doctor,ind)=>{
                  return (doctor.speciality) == (selectedDoctor.speciality) && (doctor.fullName != selectedDoctor.fullName) && <DoctorCard key={doctor._id} name={doctor.fullName} image={doctor.profilePic} speciality={doctor.speciality}  onClick={ ()=> handleGoToParticularDoctor(doctor._id) } available={doctor.available} />
                })

              }
        </div>
        
     </div>

     <Footer/>

    </>
  )
}

export default Appointment