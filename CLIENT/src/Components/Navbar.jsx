import React from 'react'

import { NavLink, useNavigate } from 'react-router-dom';

import { useState, useRef, useEffect, useContext } from 'react';


import { AppContext } from '../Contexts/AppContext';


import './CSS/Navbar.css';
import { toast } from 'react-toastify';


const Navbar = () => {


  // const [isLogin,setIsLogin] = useState(false);

  const { backend_URL, isPatientLoggedIn, setIsPatientLoggedIn, patientData, setPatientData, getAuthStatus } = useContext(AppContext);





  const profile = useRef(null); // To display menu on Hover
  const options = useRef(null);  // Same as above
  const goTop = useRef(null);


  const navigate = useNavigate();




  const goLogin = ()=>{
    navigate('/login');
  }


  const openMenu = ()=>{
    options.current.style.display = "flex"; 
  }
  const closeMenu = ()=>{
    options.current.style.display = "none";
  }


      useEffect(()=>{
        goTop.current?.scrollIntoView({behavior:"smooth"});
      },[]);


      const handleLogOut = async ()=>{
        try{

          const fetchOptions = {
            method:"GET",
            credentials:"include",
          }

          const response = await fetch(`${backend_URL}/api/patient/logOut`,fetchOptions);
          const data = await response.json();

          if(data.success){
            toast.success(data.message);
            setIsPatientLoggedIn(false);
            setPatientData(false);
            getAuthStatus();
            navigate('/');
            console.log("Patient Logged Out Successfully");
          }else{
            console.log("Error In LogOut Route Frontend",data.message);
            toast.error(data.message);
          }

        }catch(error){
          console.log("Error In LogOut Route Frontend",error);
          toast.error(`Error In LogOut Route ${error}`);
        }
      }



  return (
    <>
        <div className="nav"  ref={goTop}> 

            <div className="logo"> <img src='/Logo.png' alt="Logo" /> </div>

            <ul className="navigate">
              <li> <NavLink to='/'> Home </NavLink> </li>
              <li> <NavLink to='/doctors'> All Doctors </NavLink> </li>
              {
                isPatientLoggedIn &&
                <li> <NavLink to='/myDetails'> My Details </NavLink> </li>
              }

              <li> <NavLink to='/about'> About </NavLink> </li>
              <li> <NavLink to='/contact'> Contact Us </NavLink> </li>
            </ul>
            
            {
              isPatientLoggedIn ?
              <div className="profile" ref={profile} onMouseEnter={openMenu} >
                <img src={ patientData?.profilePic || "/user.png"} alt="User" />
                  <div className="list" ref={options} onMouseLeave={closeMenu}>
                    <div className="li" onClick={()=>navigate('/myProfile')}>My Profile</div>
                    <div className="li" onClick={()=>navigate('/myAppointment')}>My Appointment</div>
                    <div className="li" onClick={handleLogOut}> Logout </div>
                  </div>
              </div> :

            <button className="createAccount" onClick={goLogin}> Create Account </button>

            }

        </div>
    </>
  )
}

export default Navbar