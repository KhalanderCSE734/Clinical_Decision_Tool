import React from 'react'

import './CSS/Sidebar.css';

import { NavLink } from 'react-router-dom';

import { FaRegEnvelopeOpen } from "react-icons/fa6";
import { CalendarDays, MessageSquareDiff, Users   } from 'lucide-react';


import { ImProfile } from "react-icons/im";


import { useContext } from 'react';

import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';




const Sidebar = () => {


    const { isAdminLoggedIn } = useContext(AdminContext);
    const { isDoctorLoggedIn } = useContext(DoctorContext);





  return (
    <div className='sidebar'>


        {
            isAdminLoggedIn ?


            <>
            


        <NavLink className="element" to='/'>
            <div className="icon">  <FaRegEnvelopeOpen /> </div>
            <div className="name">DashBoard</div>
        </NavLink>

        <NavLink className="element" to='/appointments'>
            <div className="icon">  <CalendarDays /> </div>
            <div className="name">Appointments</div>
        </NavLink>

        <NavLink className="element" to='/addDoctor'>
            <div className="icon">  <MessageSquareDiff  /> </div>
            <div className="name">Add Doctor </div>
        </NavLink>
        
        <NavLink className="element" to='/allDoctor'>
            <div className="icon">  <Users /> </div>
            <div className="name"> Doctors List </div>
        </NavLink>

            </> :



            <>
            


        <NavLink className="element" to='/doctorDashboard'>
            <div className="icon">  <FaRegEnvelopeOpen /> </div>
            <div className="name">DashBoard</div>
        </NavLink>

        <NavLink className="element" to='/doctorAppointments'>
            <div className="icon">  <CalendarDays /> </div>
            <div className="name">Appointments</div>
        </NavLink>

        {/* <NavLink className="element" to='/addDoctor'>
            <div className="icon">  <MessageSquareDiff  /> </div>
            <div className="name">Add Doctor </div>
        </NavLink> */}
        
        <NavLink className="element" to='/doctorProfile'>
            <div className="icon">  <ImProfile /> </div>
            <div className="name"> Profile </div>
        </NavLink>

            </> 


        
        }

    </div>
  )
}

export default Sidebar