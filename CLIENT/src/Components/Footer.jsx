import React from 'react';

import '../Pages/CSS/Home.css';



import { useNavigate } from 'react-router-dom';




const Footer = ()=>{


    const navigate = useNavigate();

    


    return(
        <>

            <section className="myFooter">

            <div className="hospital">
              <div className="logo" >  <img src="/Logo.png" alt="" onClick={()=>{ navigate('/') }}/> </div>
              <p className="desc"> In Our Health Care , your health and privacy are our top priorities. 🩺✨
              We offer a seamless and secure platform for booking doctor appointments, ensuring that your personal information stays protected at all times. Whether you need a consultation with a general physician, a specialist, or a pediatrician, our network of certified healthcare professionals is here to support you. With easy scheduling, minimal wait times, and a strong commitment to your well-being, we make managing your health simpler and safer than ever before. Trust us to be your partner in building a healthier, happier life! 🌿</p>
            </div>

            <div className="company">
                <h2>Company</h2>
                <ul>
                  <li>Home</li>
                  <li>About Us</li>
                  <li>Delivary</li>
                  <li>Privacy Policy</li>
                </ul>
            </div>

            <div className="connect">
                <h2>Get In Touch </h2>
                <p className="num"> +99 9999999999 </p>
                <p className="mail"> weNours734@gmail.com </p>
            </div>

            </section>

            <section className="copy">
            Copyright 2025 @ weNours.in - All Right Reserved.
            </section>
        
        </>
    )
}


export default Footer;