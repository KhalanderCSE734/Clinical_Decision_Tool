import React from 'react'


import { useNavigate } from 'react-router-dom';


import { useRef, useEffect, useState, useContext } from 'react';



import { FaArrowRightLong } from "react-icons/fa6";

import { toast } from 'react-toastify';




import './CSS/Home.css';



import Footer from '../Components/Footer';
import DoctorCard from '../Components/HomeComponents/DoctorCard';


import { AppContext } from '../Contexts/AppContext';



// import { doctors } from '../assets/assets_frontend/assets';





const Home = () => {

  


  const navigate = useNavigate();

  const { backend_URL, isPatientLoggedIn } = useContext(AppContext);

  const [doctorsList,setDoctorsList] = useState([]);

    // const goTop = useRef(null);
  
    // useEffect(()=>{ 
    //   goTop.current?.scrollIntoView({behavior:"smooth"});
    // },[])

    // console.log(doctors);

    const bookAppointmentButton = useRef(null);



    const handleGoToParticularDoctor = (id)=>{
        navigate(`/appointment/${id}`);
    }


    const fetchDoctors = async()=>{
        try{

          const fetchOptions = {
            method:'GET',
            credentials:'include'
          } 
          // console.log("Entering here");
          const response = await fetch(`${backend_URL}/api/patient/allDoctors`,fetchOptions);
          const data = await response.json();
          // console.log("But not here");
          if(data.success){
            // console.log(data.message);
            setDoctorsList(data.message);
          }else{
            toast.error(data.message);
          }

        }catch(error){
            console.log("Error in Fetching Doctors",error);
            toast.error(error);
        }
    }


    useEffect(()=>{
      fetchDoctors();
     },[]);





  return (
    <>
        <section className="Hero" >

          <div className="leftContainer">

            <h1> Book Appointment With Trusted Doctors</h1>
            <div className="myContainer">
              <div className="images"> <img src="/GroupProfile.png" alt="profile" /> </div>
              <p> Simply browse through our extensive list of trusted doctors,
              schedule your appointment hassle-free. </p>
            </div>
            <button onClick={()=>{ bookAppointmentButton.current?.scrollIntoView({ behavior:"smooth" }); }}> <span>   Book Appointment </span> <div className="arrow">   <FaArrowRightLong />  </div> </button>
            
          </div>


          <div className="rightContainer">

            <img src="/GroupDoctors.png" alt="Doctors" />

          </div>


        </section>


      <section className='specialities' ref={bookAppointmentButton}>

        <h2> Find by Speciality </h2>

        <p className='desc'> Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free. </p>

        <div className="images">

          <div className="imageContainer" onClick={()=> navigate('/doctors/general-physician')}>
            <img src="/Speciality/GeneralPhysician.png" alt="generalPhysician" />
            <p> General Physician</p>
          </div>
          <div className="imageContainer" onClick={()=> navigate('/doctors/gynecologist')}>
            <img src="/Speciality/Gyenocologist.png" alt="" />
            <p> Gynecologist </p>
          </div>
          <div className="imageContainer" onClick={()=> navigate('/doctors/dermatologist')}>
            <img src="/Speciality/Dermatalogist.png" alt="" />
            <p> Dermatologist </p>
          </div>
          <div className="imageContainer" onClick={()=> navigate('/doctors/pediatricians')}>
            <img src="/Speciality/Pediatricians.png" alt="" />
            <p> Pediatricians </p>
          </div>
          <div className="imageContainer" onClick={()=> navigate('/doctors/neurologist')}>
            <img src="/Speciality/Neurologist.png" alt="" />
            <p> Neurologist </p>
          </div>
          <div className="imageContainer" onClick={()=> navigate('/doctors/gastroenterologist')}>
            <img src="/Speciality/Gastroenterologist.png" alt="" />
            <p> Gastroenterologist </p>
          </div>

        </div>


      </section>


      <section className="doctorList">

          <h2> Top Doctors to Book </h2>
          <p> Simply browse through our extensive list of trusted doctors. </p>

          <div className="doctorContainer">

            {
              // Array(10).fill(10).map((_,ind)=>{
              //   return <DoctorCard key={ind}/>
              // })
              doctorsList.slice(0,10).map((doctor,ind)=>{
                 return <DoctorCard key={doctor._id} name={doctor.fullName} image={doctor.profilePic} speciality={doctor.speciality} onClick={()=> handleGoToParticularDoctor(doctor._id) } available={doctor.available}/>
              })
            }

          </div>

          <button onClick={()=>navigate("/doctors")}> More </button>

      </section>


      <section className="market">

        <div className="left">

          <h1> Book Appointment With 100+ Trusted Doctors </h1>
          {
            !isPatientLoggedIn &&

          <button onClick={()=>navigate("/login")}> Create Account </button>

          }
        </div>

        <div className="right">
            <img src="/Create.png" alt="" />
        </div>
        
      </section>



      <Footer/>
      


    </>
  )
}

export default Home