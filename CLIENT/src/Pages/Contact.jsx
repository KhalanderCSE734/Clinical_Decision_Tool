import React from 'react'


import './CSS/Contact.css';
import Footer from '../Components/Footer';


const Contact = () => {
  return (
    <>

      <div className="contactInfoDiv">

        <img src="/ContactImage.png" alt="Image" />

        <div className="contactInfo">
          
          <h3>Our Office</h3>
          <p>   BMS College Of Engineering, Basavanagudi, Bengalore, Karnataka</p>
          <p> Tel: (000) 000-0000-0000 </p>
          <p> Email: weNours@gmail.com </p>
          <h3>Careers At HealthCare</h3>
          <p> Thank You </p>

        </div>

      </div>

      <img src="/Hospital.png" alt="Hospital" className='contactImg'/>   
      

      <Footer/>

    </>
  )
}

export default Contact