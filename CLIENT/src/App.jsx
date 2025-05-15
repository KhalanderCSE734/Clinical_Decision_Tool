import React from 'react';



import { ToastContainer , Bounce } from 'react-toastify';


import { useContext, useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';


import { AppContext } from './Contexts/AppContext';




import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Doctors from './Pages/Doctors';
import Login from './Pages/Login';
import OTP from './Pages/OTP';
import PatientAppointment from './Pages/PatientAppointment';
import PatientProfile from './Pages/PatientProfile';
import Appointment from './Pages/Appointment';
import PatientDetails from './Pages/PatientDetails';
import MessageDoctor from './Pages/MessageDoctor';
import PageNotFound from './Pages/PageNotFound';



import Navbar from './Components/Navbar';




const App = ()=>{

  const { getAuthStatus } = useContext(AppContext);

  // getAuthStatus();

  useEffect(()=>{ 
    getAuthStatus();
  },[]);
  
  return(
    <>

      <Navbar/>
      
    
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/verifyEmail' element={<OTP/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/doctors' element={<Doctors/>}/>
        <Route path='/doctors/:speciality' element={<Doctors/>}/>  {/** This Route is for 'If User Selects Speciality of doctors' then doctors with that speciality should work */}
        <Route path='/myAppointment' element={ <PatientAppointment/> }/>
        <Route path='myProfile' element={ <PatientProfile/> }/>
        <Route path='/appointment/:doctorID' element={<Appointment/>}/>   {/**  This one is Particula doctor where user can go and book appointment */}
        <Route path='/myDetails' element={ <PatientDetails/> }/>
        <Route path='/messages/:doctorId' element={ <MessageDoctor/> }/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>




      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />


    </>
  )
}

export default App;