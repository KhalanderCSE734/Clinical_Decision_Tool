import React from 'react'


import './CSS/Login.css';



import { useState, useEffect, useContext, useRef } from 'react';

import { useNavigate } from 'react-router-dom';


import { toast } from 'react-toastify';


import { AppContext } from '../Contexts/AppContext';


const Login = () => {


  const [formDetails,setFormDetails] = useState({ fullName:"", email:"", password:""  })

  const [loginState,setLoginState] = useState(false);

  const { backend_URL, isPatientLoggedIn,setIsPatientLoggedIn, patientData,setPatientData, getAuthStatus, setPatientMail } = useContext(AppContext);

  const navigate = useNavigate();


  const changeFormDetail = (evt)=>{
      const name = evt.target.name;
      const value = evt.target.value;
      setFormDetails((prev)=>{
        return {...prev,[name]:value}
      })
   }



  const handleForm = async (evt)=>{
    evt.preventDefault();
    // console.log(formDetails);
    try{
      const fetchOptions = {
        method:"POST",
        credentials:"include",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formDetails)
      }

      if(!loginState){      // Sign Up State
          const response = await fetch(`${backend_URL}/api/patient/signup`,fetchOptions);
          const data = await response.json();

          if(data.success){
            toast.success(data.message);
            // setIsPatientLoggedIn(true);
            // getAuthStatus();
            setPatientMail(formDetails.email);
            navigate('/verifyEmail');
            
          }else{
            console.log(data);
            toast.error(data.message);
            setIsPatientLoggedIn(false);
          }
      }else{      // LogIn State
          const response = await fetch(`${backend_URL}/api/patient/login`,fetchOptions);
          const data = await response.json();
          if(data.success){
            toast.success(data.message);
            setIsPatientLoggedIn(true);
            getAuthStatus();
            navigate('/');
          }else{
            console.log(data.message);
            toast.error(data.message);
            setIsPatientLoggedIn(false);
          }
      }


    }catch(error){
        console.log("Error in Front-End Login Handler ", error);
        toast.error(error);
    }

    setFormDetails({ fullName:"", email:"", password:""  });
  }




  return (
    <>
       <div className="login">
          <form className="login-container" onSubmit={handleForm}>
            {
              !loginState ?
              <h2> Create Account </h2>
              :
              <h2> Login </h2>
            }
            {
              !loginState ?
              <p>  Please Sign Up to Book Appointment </p>
              :
              <p>  Please log in to Book Appointment </p>
            }
             
             {
              !loginState &&
                  <div className="input">
                  <p>Full Name</p>
                  <input type="text" name="fullName" value={formDetails.fullName} onChange={changeFormDetail} id="name" required autoComplete='off'/>
                  </div>
            }
              

              <div className="input">
                  <p>E-Mail</p>
                  <input type="email" name="email" value={formDetails.email} onChange={changeFormDetail} id="email" required autoComplete='off'/>
              </div>
              <div className="input">
                  <p>Password</p>
                  <input type="password" name="password" value={formDetails.password} onChange={changeFormDetail} id="password" required autoComplete='off'/>
              </div>

              {
                !loginState ?
                // <button> Create Account </button>:
                <button> Send OTP </button>:
                <button> Login </button>

              }
              {
              !loginState ?
              <p> Already Have an Account ? <span onClick={()=>setLoginState(true)}> Login Here </span> </p>
              :
              <p> Create an new account ?  <span onClick={()=>setLoginState(false)}> Click here </span> </p>
            }
              

          </form>
       </div>
    </>
  )
}

export default Login