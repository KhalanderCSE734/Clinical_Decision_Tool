


import { useState, createContext } from 'react';



import { toast } from 'react-toastify';



const AdminContext = createContext();


const AdminContextProvider = (props)=>{

    const [isAdminLoggedIn,setIsAdminLoggedIn] = useState(false);

    const [appointmentData,setAppointmentData] = useState([]);
    const [appointmentCount,setAppointmentCount] = useState([]);

    const backend_URL = import.meta.env.VITE_BACKEND_URL;

  

    const getAdminAuthStatus = async ()=>{
 
        try{
            const fetchOptions = {
                method:'GET',
                credentials:'include'
            }

            const response = await fetch(`${backend_URL}/api/admin/authCheck`,fetchOptions);
            const data = await response.json();

            // console.log(data);

            if(data.success){
                setIsAdminLoggedIn(true);
                console.log(data);
            }else{
                setIsAdminLoggedIn(false);
                console.log(data);
                
            }


        }catch(error){
            toast.error(`Error in Getting Admin Auth in Front-End, ${error}`);
        }
    }



        const fetchAppointments = async()=>{
    
            try{
    
                const fetchOptions = {
                    method:"GET",
                    credentials:"include",
                }
    
                const response = await fetch(`${backend_URL}/api/admin/allAppointments`,fetchOptions);
                const data = await response.json();
                // console.log(data);
                if(data.success){
                    let count = 0;
                    let appointmentsArray = [];
                    data.appointments.forEach((appointment,ind)=>{
                        if(appointment.cancelled===false && appointment.completed == false){
                            count++;
                            appointmentsArray.push(appointment);
                        }
                    })
                    // console.log(appointmentsArray);
                    setAppointmentCount(count);
                    // console.log("Hello");
                    setAppointmentData(appointmentsArray);

                    // setAppointmentData(data.appointments);


                }else{
                    toast.error(data.message);
                }
    
    
            }catch(error){
                console.log("Error in Fetching Appointments",error);
                toast.error(error);
            }
    
        }





    const value = {
        backend_URL,
        isAdminLoggedIn,setIsAdminLoggedIn,getAdminAuthStatus,
        appointmentData,fetchAppointments,appointmentCount
    }

    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider;

export { AdminContext };