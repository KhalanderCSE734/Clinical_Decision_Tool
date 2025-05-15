import React from 'react';

import { useContext, useEffect } from 'react';



import { Routes, Route } from 'react-router-dom';


import { ToastContainer, Bounce } from "react-toastify";



import { AppContext } from './context/AppContext'; 
import { AdminContext } from './context/AdminContext';

import { DoctorContext } from './context/DoctorContext';




import Login from './pages/Login';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import Home from './pages/AdminPages/Home';
import AllAppointments from './pages/AdminPages/AllAppointments';
import AddDoctor from './pages/AdminPages/AddDoctor';
import AllDoctors from './pages/AdminPages/AllDoctors';



import DoctorHome from './pages/DoctorPages/DoctorHome';
import DoctorAllAppointment from './pages/DoctorPages/DoctorAllAppointment';
import DoctorProfile from './pages/DoctorPages/DoctorProfile';


import PatientDetails from './pages/DoctorPages/PatientDetails';
import MessagePatient from './pages/DoctorPages/MessagePatient';




const App = ()=>{

  const { isAdminLoggedIn, getAdminAuthStatus } = useContext(AdminContext);

  const { isDoctorLoggedIn, getDoctorAuthStatus } = useContext(DoctorContext);

  useEffect(()=>{ 
    getAdminAuthStatus();
  },[isAdminLoggedIn]);


  useEffect(()=>{ 
    getDoctorAuthStatus();
   },[isDoctorLoggedIn]);

 

    if(isAdminLoggedIn || isDoctorLoggedIn){
      return(
          <>
            <Navbar/>
            <div className='flex'>
             
              <Sidebar/>

                

              <Routes>

                  { /** Admin Routes */ }
                  <Route path='/' element={ isAdminLoggedIn && <Home/> }/>     {/** DashBoard is Mounted Here */}
                  <Route path='/appointments' element={<AllAppointments/>}/>
                  <Route path='/addDoctor' element={<AddDoctor/>}/>
                  <Route path='/allDoctor' element={<AllDoctors/>}/>

                  { /** Doctor Routes */ }

                  <Route path='/doctorDashboard' element={ <DoctorHome/> }/>
                  <Route path='/doctorAppointments' element={ <DoctorAllAppointment/> }/>
                  <Route path='/doctorProfile' element={ <DoctorProfile/> }/>
                  
                  <Route path='/messages/:patientId' element={ <MessagePatient/> }/>
                  <Route path='/patientDetails/:patientId' element={ <PatientDetails/> } />

              </Routes>
              {/* <HomeContainer/> */}
              {/* <AllAppointments/> */}
              {/* <AddDoctor/> */}
              {/* <AllDoctors/> */}

            </div>

            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              transition={Bounce}
            />
          </>
        )
    }
  
  return(
    <>
      {/* <Navbar/> */}
      <Login/>

     <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition={Bounce}
    />
    </>
  )



}

export default App;