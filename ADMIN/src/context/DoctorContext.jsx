


import { useState, createContext, useEffect } from 'react';


import { toast } from 'react-toastify';



const DoctorContext = createContext();


const DoctorContextProvider = (props)=>{


    const backend_URL = import.meta.env.VITE_BACKEND_URL;

    const [isDoctorLoggedIn,setIsDoctorLoggedIn] = useState(false);
    const [doctorData,setDoctorData] = useState(null);

    const [allAppointments,setAllAppointments] = useState([]);


    const [cancelledAppointments,setCancelledAppointments] = useState([]);
    const [completedAppointments,setCompletedAppointments] = useState([]);
    const [onGoingAppointments,setOnGoingAppointments] = useState([]);


    
        const getDoctorData = async ()=>{
    
            try{
    
                const fetchOptions = {
                    method:"GET",
                    credentials:"include"
                }
    
                const response = await fetch(`${backend_URL}/api/doctor/getCurrentDoctor`,fetchOptions);
                const data = await response.json();
                // console.log("Response from GetDoctor Data", data);
                if(data.success){
                    // console.log(data);
                    setDoctorData(data.message);
                }else{
                    console.log(data.message);
                    // toast.error(data.message);
                    setIsDoctorLoggedIn(false);
                }
                
    
            }catch(error){
                console.log(`Error In handling Get Doctor Data Fron-End ${error}`);
                toast.error(`Error In handling Get Doctor Data Fron-End ${error}`);
            }
    
        }
    
    
    
    
        const getDoctorAuthStatus = async()=>{
            try{
    
                const fetchOptions = {
                    method:"GET",
                    credentials:"include",
                }
                // console.log("Am I able to enter here");
                const response = await fetch(`${backend_URL}/api/doctor/doctorAuth`,fetchOptions);
                const data = await response.json();
                // console.log("Not able to enter here ",data);
                if(data.success){
                    getDoctorData();
                    setIsDoctorLoggedIn(true);
                }else{
                    console.log(data);
                    setIsDoctorLoggedIn(false);
                    setDoctorData(null);
                    // toast.error(data.message);
                }
    
    
            }catch(error){
                console.log("Error In Front-End Getting Auth Status of Doctor ", error);
                toast.error(error);
            }
        }



        const getAllAppointments = async ()=>{
            try{

                const fetchOptions = {
                    method:"GET",
                    credentials:"include"
                }

                const response = await fetch(`${backend_URL}/api/doctor/allAppointments`,fetchOptions);
                const data = await response.json();

                if(data.success){
                    setAllAppointments(data.message);
                    // console.log(data.message);
  
                    let cancelApp = [];
                    let completedApp = [];
                    let onGoingApp = [];

                    data.message.forEach((app,ind)=>{
                        if(app.completed && !app.cancelled){
                            completedApp.push(app);
                        }else if(!app.completed && app.cancelled){
                            cancelApp.push(app);
                        }else if(!app.completed && !app.cancelled){
                            onGoingApp.push(app);
                        }
                    })

                    console.log("OnGoing Appointments ",onGoingApp);
                    console.log("Cancelled Appointments ",cancelApp);
                    console.log("Completed Appointments ",completedApp);

                    // const [cancelledAppointments,setCancelledAppointments] = useState([]);
                    // const [completedAppointments,setCompletedAppointments] = useState([]);
                    // const [onGoingAppointments,setOnGoingAppointments] = useState([]);
                    
                    setCancelledAppointments(cancelApp);
                    setOnGoingAppointments(onGoingApp);
                    setCompletedAppointments(completedApp);



                }else{
                    toast.error(data.message);
                    console.log(data);
                }


            }catch(error){
                console.log("Error In Front-End Getting All Appointments of Doctor ", error);
                toast.error( " Error In Front-End Getting All Appointments of Doctor " ,error);
            }
        }



    const value = {
        backend_URL,
        isDoctorLoggedIn,setIsDoctorLoggedIn,
        getDoctorAuthStatus,
        doctorData,
        getAllAppointments, allAppointments,
        onGoingAppointments, completedAppointments, cancelledAppointments
    }

    return(
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )

}

export default DoctorContextProvider;

export { DoctorContext };