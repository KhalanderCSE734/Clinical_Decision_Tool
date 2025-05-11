import React from 'react'


import './CSS/About.css'



import Footer from '../Components/Footer'; 





const About = () => {
  return (
    <>
      
      <p className='text-center font-bold text-[2.3rem]' style={{marginTop:"20px"}}> About Us </p>

      <div className="about">

        <div className="img"> 
            <img src="/About.png" alt="About Us" />
        </div>

        <div className="desc">

            <p>Welcome to HealthCare, your trusted partner in managing your healthcare needs conveniently and efficiently. At HealthCare, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
            <p> HealthCare is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, HealthCare is here to support you every step of the way.</p>

            <h1>Our Vision</h1>

            <p>Our vision at HealthCare is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>

        </div>

      </div>


      <section className="whyUs">

      <h3> Why Choose Us </h3>

      <div className="boxes">

        <div className="box">
          <h2>EFFICIENCY: </h2>
          <p> Streamlined appointment scheduling that fits into your busy lifestyle. </p>
        </div>
        <div className="box">
          <h2>CONVENIENCE: </h2>
          <p> Access to a network of trusted healthcare professionals in your area. </p>
        </div>
        <div className="box">
          <h2>PERSONALIZATION: </h2>
          <p> Tailored recommendations and reminders to help you stay on top of your health. </p>
        </div>


      </div>


      </section>


      <Footer/>
      

    </>
  )
}

export default About