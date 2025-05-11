import React from 'react'



import { useEffect, useRef, useContext, useState } from 'react';



import { useNavigate, useParams } from 'react-router-dom';



import './CSS/Doctors.css';
import DoctorCard from '../Components/HomeComponents/DoctorCard';
import Footer from '../Components/Footer';




// import { doctors } from '../assets/assets_frontend/assets';


import { AppContext } from '../Contexts/AppContext';


import { toast } from 'react-toastify';




const Doctors = () => {




  const goTop = useRef(null);

  const navigate = useNavigate();


  const { speciality } = useParams();

  const { backend_URL } = useContext(AppContext);


   const [doctorsList,setDoctorsList] = useState([]);


  // console.log(speciality);

  // const { doctorsList } = useContext(AppContext);

  // console.log( doctorsList );



  useEffect(()=>{ 
    goTop.current?.scrollIntoView({behavior:"smooth"});
  },[]);


  // console.log(doctors); 


  const handleGoToParticularDoctor = (id)=>{
    navigate(`/appointment/${id}`);
  }



  
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
       },[]);
  




  return (
    <>
        <h1 ref={goTop}> Browse through the doctors specialist. </h1>   

        <div className="myContainerDoctor">     {/** Here I have given little bit weired class because I have already give that old class in Other components so */}

              <div className="filter">
                    <div className={`speciality ${!speciality ? `bg-[#007e85ef] text-white ` : `bg-white` }`} onClick={()=>       navigate('/doctors')} > All Doctors </div>

                    <div className={`speciality ${speciality=='general-physician' ? `bg-[#007e85ef] text-white ` : `bg-white` }`} onClick={()=>      navigate('/doctors/general-physician')} > General Physician </div>
                    <div className={`speciality ${speciality=='gynecologist' ? `bg-[#007e85ef] text-white ` : `bg-white` }`}      onClick={()=>navigate('/doctors/gynecologist')}> Gynecologist </div>
                    <div className={`speciality ${speciality=='dermatologist' ? `bg-[#007e85ef] text-white ` : `bg-white` }`}      onClick={()=>navigate('/doctors/dermatologist')}> Dermatologist </div>
                    <div className={`speciality ${speciality=='pediatricians' ? `bg-[#007e85ef] text-white ` : `bg-white` }`}      onClick={()=>navigate('/doctors/pediatricians')}> Pediatricians </div>
                    <div className={`speciality ${speciality=='neurologist' ? `bg-[#007e85ef] text-white ` : `bg-white` }`}      onClick={()=>navigate('/doctors/neurologist')}> Neurologist </div>
                    <div className={`speciality ${speciality=='gastroenterologist' ? `bg-[#007e85ef] text-white ` : `bg-white` }`} onClick={()=>navigate('/doctors/gastroenterologist')}> Gastroenterologist </div>
              </div>

              <div className="doctorListDoctor">
                  
                {
                  !speciality ?
                  // Array(15).fill(0).map((_,ind)=>{
                  //   return <DoctorCard key={ind}/>
                  // })
                  doctorsList.map((doctor,ind)=>{
                    return <DoctorCard key={doctor._id} name={doctor.fullName} image={doctor.profilePic} speciality={doctor.speciality} onClick={ ()=> handleGoToParticularDoctor(doctor._id) } available={doctor.available} />
                  }) :
                  doctorsList.map((doctor,ind)=>{
                    return (doctor.speciality.replace(" ","").toLowerCase()) == (speciality.replace("-","").toLowerCase()) && <DoctorCard key={doctor._id} name={doctor.fullName} image={doctor.profilePic} speciality={doctor.speciality}  onClick={ ()=> handleGoToParticularDoctor(doctor._id) } available={doctor.available} />
                  }) 

                }

              </div>

        </div>

        <Footer/>



    </>
  )
}

export default Doctors