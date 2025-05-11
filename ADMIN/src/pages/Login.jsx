import React from 'react';


import { useState, useContext } from 'react'

import { AdminContext } from '../context/AdminContext';

import { DoctorContext } from '../context/DoctorContext';


import './CSS/Login.css';


import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';





const Login = () => {


    const { backend_URL, isAdminLoggedIn, setIsAdminLoggedIn,  } = useContext(AdminContext);

    const { isDoctorLoggedIn,setIsDoctorLoggedIn, getDoctorAuthStatus } = useContext(DoctorContext);



    const [loginState,setLoginState] = useState('Admin');

    const [formDetails,setFormDetails] = useState({  email: '', password: '' });

    const navigate = useNavigate();


    const handleChange = (evt)=>{
      const name = evt.target.name;
      const value = evt.target.value;
      setFormDetails((prev)=>{
        return {...prev,[name]:value};
      })
    }


    const handleSubmit = async (evt)=>{
      evt.preventDefault();
      // console.log(formDetails);
      try{

        
        if(loginState=='Admin'){
          
          const fetchOptions = {
            method:'POST',
            credentials:'include',
            headers:{
              'Content-Type':'application/json',
          },
          body:JSON.stringify(formDetails),
        }
        
        // console.log(backend_URL);
        const response = await fetch(`${backend_URL}/api/admin/login`,fetchOptions);
        const data = await response.json();
        // console.log(data);
        
        if(data.success){
          toast.success(data.message);
          setIsAdminLoggedIn(true);
          navigate('/');
        }else{
          toast.error(data.message);
        }
        
        }else{
            const fetchOptions = {
              method:"POST",
              credentials:"include",
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify(formDetails),
            }

            const response = await fetch(`${backend_URL}/api/doctor/login`,fetchOptions);
            const data = await response.json();

            if(data.success){
              toast.success(data.message);
              setIsDoctorLoggedIn(true);
              getDoctorAuthStatus();
              navigate('/doctorDashboard');
              console.log(data);
            }else{
              toast.error(data.message);
              setIsDoctorLoggedIn(false);
            }

        }
        
        setFormDetails({email:'',password:''});
      }catch(error){
        toast.error(`Error in Admin Login ${error.message}`);
      }

    }



  return (

    <div className='Login-Parent'>

    <form className='form-container' onSubmit={handleSubmit}>
        <h1> <span>   {loginState} </span> Login </h1>

        <div className="input">
          <p>Email</p>
          <input type="email" name="email" id="email" onChange={handleChange} value={formDetails.email} required />
        </div>

        <div className="input">
          <p>Password</p>
          <input type="password" name="password" id="pass" onChange={handleChange} value={formDetails.password} required />
        </div>


        <button type="submit">Login</button>
        {
            loginState == 'Admin' ?

            <p> Doctor Login ? <span onClick={()=>setLoginState('Doctor')}> Click Here </span> </p>
            :    
            <p> Admin Login ? <span onClick={()=>setLoginState('Admin')}> Click Here </span> </p>
        }

    </form>
    
    </div>

  )
}

export default Login