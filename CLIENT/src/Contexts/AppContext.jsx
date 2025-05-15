import React from 'react';

import { useState, createContext } from 'react';


import { useNavigate } from'react-router-dom';

const AppContext = createContext();


import { toast } from 'react-toastify';


import { doctors } from '../assets/assets_frontend/assets';



const AppContextProvider = (props)=>{


    const backend_URL = import.meta.env.VITE_BACKEND_URL;

    const [isPatientLoggedIn,setIsPatientLoggedIn] = useState(false);
    const [patientData,setPatientData] = useState(null);

    const [patientMail,setPatientMail] = useState("");


    const navigate = useNavigate();

    const getUserData = async ()=>{

        try{

            const fetchOptions = {
                method:"GET",
                credentials:"include"
            }

            const response = await fetch(`${backend_URL}/api/patient/getPatientDetails`,fetchOptions);
            const data = await response.json();

            if(data.success){
                // console.log(data);
                setPatientData(data.message);
            }else{
                console.log(data.message);
                // toast.error(data.message);
                setIsPatientLoggedIn(false);
            }


        }catch(error){
            console.log(`Error In handling Get user Data Fron-End ${error}`);
        }

    }




    const getAuthStatus = async(evt)=>{
        try{

            const fetchOptions = {
                method:"GET",
                credentials:"include",
            }
            // console.log("Am I able to enter here");
            const response = await fetch(`${backend_URL}/api/patient/checkAuth`,fetchOptions);
            const data = await response.json();
            // console.log("Not able to enter here ",data);
            if(data.success){
                getUserData();
                setIsPatientLoggedIn(true);
            }else{
                setIsPatientLoggedIn(false);
                // toast.error(data.message);
            }


        }catch(error){
            console.log("Error In Front-End Getting Auth Status ", error);
            toast.error(error);
        }
    }

    // getAuthStatus();






    const VerifyEmailOTP = async (OTP)=>{
        try{
            const fetchOptions = {
                method:"POST",
                credentials:"include",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({patientMail,OTP}),
            }

            const response = await fetch(`${backend_URL}/api/patient/verifyAccount`,fetchOptions);

            const data = await response.json();
            console.log(data);
            if(data.success){
                toast.success(data.message);
                setIsPatientLoggedIn(true);
                getAuthStatus();
                navigate('/');
            }else{
                toast.error(data.message);
                inputRefs.current[inputRefs.current.length-1].focus();
            }
        }catch(error){

        }
    }









    const value = {
        doctorsList:doctors,
        backend_URL,
        isPatientLoggedIn,setIsPatientLoggedIn,
        patientData,setPatientData,
        getAuthStatus,
        VerifyEmailOTP,
        setPatientMail
    };


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )



}


export { AppContext };
export default AppContextProvider;