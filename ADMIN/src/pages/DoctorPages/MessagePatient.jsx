import React from 'react'


import { useState, useContext, useRef, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';


import { X,Image,Send, Loader } from 'lucide-react';


import { toast } from 'react-toastify';



import '../CSS/MessagePatient.css';


import { DoctorContext } from '../../context/DoctorContext';



const MessagePatient = () => {

     const { patientId } = useParams();

    //  console.log(patientId);


    const { backend_URL } = useContext(DoctorContext);


    const messageEndRef = useRef();
    const imageHandle = useRef();  // This is for Handling click of the image

    const [imagePreview,setImagePreview] = useState("");
    const [text,setText] = useState("");

    const [loading,setLoading] = useState(false);


    const [messages,setMessages] = useState([]);

    const [formData,setFormData] = useState({
        text:"",
        image:"",
    })


    const handleTextChange = (evt)=>{
        const name = evt.target.name;
        const value = evt.target.value;
        setFormData((prev)=>{
            return {...prev,[name]:value};
        })
    }

    useEffect(()=>{ 
        messageEndRef.current?.scrollIntoView({behaviour:"smooth"});
    },[messages]);


    const handleImageChange = async(evt)=>{
        const image = evt.target.files[0];

        if(!image){
          return;
        }

        const reader = new FileReader();
    
        reader.readAsDataURL(image);
    
        reader.onload = async ()=>{
          const base64Image = reader.result;
          setFormData((prev)=>{
            return {...prev,image:base64Image};
          })
        }
    }

    const handleSubmit = async(evt)=>{
        evt.preventDefault();
        if(!formData.text && !formData.image){
            toast.warn("Please Enter Text or image to chat");
            return;
        }

        try{
        
           setLoading(true);
           const fetchOptions = {
             method:"POST",
             credentials:"include",
             headers:{
               "Content-Type":"application/json"
             },
             body:JSON.stringify(formData),
           }

           const response = await fetch(`${backend_URL}/api/messages/doctorSendMessage/${patientId}`,fetchOptions);
           const data = await response.json();

           if(data.success){
             console.log(data);
             fetchMessages();
           }else{
             console.log(data);
             toast.error(data.message);
           }


        }catch(error){
          console.log(`Error In Patient Sending Messages ${error}`);
        }finally{
          setFormData({
            text:"",
            image:"",
          });
          setLoading(false);
        }




    }


    const fetchMessages = async ()=>{
      try{

        const fetchOptions = {
          method:"GET",
          credentials:"include"
        }

        const response = await fetch(`${backend_URL}/api/messages/doctorGetMessages/${patientId}`,fetchOptions);
        const data = await response.json();

        if(data.success){
          setMessages(data.message);
          console.log("Fetching Messages ",data.message);
        }else{
          console.log(data);
          toast.error(data.message);
        }


      }catch(error){
        console.log(`Error in Getting Messages (Client) Front-end ${error} `);
        toast.error(error);
      }
    }

    useEffect(()=>{ 
      fetchMessages();
    },[]);





  return (
     <div className='message-patient-container'>
        {/* <h1 style={{marginTop:'10px',border:'none'}}>Chat With Doctor </h1> */}


        {/** Header */}
    <div className="border-b" style={{width:"100%",height:"60px"}}>
      <div className="flex items-center justify-end" style={{}}>
        <div className=' border-base-300' style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"}} >
          {/* Avatar */}
            <h1 style={{fontSize:"1.2rem",fontWeight:"600"}}>Chat With Patient </h1>
          <div className='flex justify-between items-center w-[30%]'>

          
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={ messages[0]?.patientId.profilePic || "/user.png"} alt="Doctor" style={{borderRadius:"50%"}}/>
            </div>
          </div>

          {/* User info */}
          <div style={{width:"80%"}}>
            <h3 className="text-xl font-bold " > { messages[0]?.patientId.fullName || "Patient"} </h3>
          </div>

          </div>

        </div>

      </div>
    </div>


    {/** Chat Body */}
 

   <div className="message-body">
        {/* <h2>  Messages Are End To End Encrypted </h2> */}
        <h2> </h2>
        {/* 
        <div className="hold-message" style={{justifyContent:"flex-end"} } >
            
           
                    <div className="message-patient items-end">
                        <div className="img"> <img src="/user.png" alt="image" />  </div>
                        <div className="text"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab beatae velit odit ut tempora cumque, dolorum esse blanditiis necessitatibus earum aspernatur alias impedit nostrum aliquid. Excepturi voluptates sunt, deserunt molestiae, unde reiciendis cum ab odio placeat animi quas repellat cumque quidem asperiores ipsam eos nam delectus nihil tempore ipsum perspiciatis mollitia! Quis quam suscipit possimus dolore eligendi nulla in dolores, atque libero magni ratione fuga sapiente impedit, exercitationem dolorum ex facere sunt. Iste laboriosam alias delectus molestiae aspernatur voluptatem inventore, deserunt quo. </div>
                    </div>
                    <div className="dp-image">
                         <img src={"/user.png"} alt="" />
                    </div>
               
               
                    {/* <div className="dp-image">

                    </div>
                    <div className="message-doctor items-start">
                        <div className="img">  </div>
                        <div className="text"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab beatae velit odit ut tempora cumque, dolorum esse blanditiis necessitatibus earum aspernatur alias impedit nostrum aliquid. Excepturi voluptates sunt, deserunt molestiae, unde reiciendis cum ab odio placeat animi quas repellat cumque quidem asperiores ipsam eos nam delectus nihil tempore ipsum perspiciatis mollitia! Quis quam suscipit possimus dolore eligendi nulla in dolores, atque libero magni ratione fuga sapiente impedit, exercitationem dolorum ex facere sunt. Iste laboriosam alias delectus molestiae aspernatur voluptatem inventore, deserunt quo. </div>
                    </div> 
           

            {/* <div className="message-doctor">

            </div> 


        </div>

        */}

{/*
        <div className="hold-message" style={{justifyContent:"flex-start"} } >
         <div className="hold-message" style={patient? {justifyContent:"flex-end"}:{justifyContent:"flex-start"} } > */}
            
           
                    {/* <div className="message-patient items-end">
                        <div className="img">  </div>
                        <div className="text"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab beatae velit odit ut tempora cumque, dolorum esse blanditiis necessitatibus earum aspernatur alias impedit nostrum aliquid. Excepturi voluptates sunt, deserunt molestiae, unde reiciendis cum ab odio placeat animi quas repellat cumque quidem asperiores ipsam eos nam delectus nihil tempore ipsum perspiciatis mollitia! Quis quam suscipit possimus dolore eligendi nulla in dolores, atque libero magni ratione fuga sapiente impedit, exercitationem dolorum ex facere sunt. Iste laboriosam alias delectus molestiae aspernatur voluptatem inventore, deserunt quo. </div>
                    </div>
                    <div className="dp-image">

                    </div> 
               
                    <div className="dp-image">
                      <img src={"/user.png"} alt="" />
                    </div>
                    <div className="message-doctor items-start">
                        <div className="img">  </div>
                        <div className="text"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab beatae velit odit ut tempora cumque, dolorum esse blanditiis necessitatibus earum aspernatur alias impedit nostrum aliquid. Excepturi voluptates sunt, deserunt molestiae, unde reiciendis cum ab odio placeat animi quas repellat cumque quidem asperiores ipsam eos nam delectus nihil tempore ipsum perspiciatis mollitia! Quis quam suscipit possimus dolore eligendi nulla in dolores, atque libero magni ratione fuga sapiente impedit, exercitationem dolorum ex facere sunt. Iste laboriosam alias delectus molestiae aspernatur voluptatem inventore, deserunt quo. </div>
                    </div>
               

            {/* <div className="message-doctor">

            </div> 


        </div>
*/}
        {
          messages.map((message,ind)=>{
            return (
              <div className="hold-message" style={message.isSenderPatient ? {justifyContent:"flex-start"} : {justifyContent:'flex-end'} } key={message._id} >
            
                  {
                    message.isSenderPatient ?
                    <>
                      <div className="dp-image">
                           <img src={ message.patientId.profilePic || "/user.png"} alt="" />
                      </div>
                      
                      <div className="message-patient items-start">
                        {
                          message.image &&

                        <div className="img"> <img src={ message.image || "/user.png"} alt="image" />  </div>
                        }
                        {
                          message.text &&

                          <div className="text"> {message.text} </div>
                        }
                      </div>
                    </>:

                    <>
                       <div className="message-doctor items-end">
                          {
                            message.image &&

                           <div className="img"> <img src={ message.image || "/user.png"} alt="image" /> </div>
                          }
                          
                          {
                            message.text &&


                           <div className="text"> {message.text} </div>

                          }

                       </div>

                       <div className="dp-image">
                        <img src={ message.doctorId.profilePic || "/user.png"} alt="" />
                       </div>

                    </>
                  }
                    
            </div>
            )
          })
        }



        

        <div ref={messageEndRef}> </div>
        
    </div>



    {/* Chat Input */}


    <div className="message-chat-inputs">
      {
        formData.image &&



        <div className="mb-3 flex items-center gap-2" style={{position:"absolute",bottom:"40px",left:"60px"}}>
          <div className="relative">
            <img src={ formData.image || "/user.png"} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-zinc-700" />
            <button className="absolute -top-5 -right-1.5 rounded-full bg-zinc-300 flex items-center justify-center" style={{height:"20px",width:"20px",padding:"10px 15px"}} onClick={()=>{ setFormData((prev)=>{ return {...prev,image:""} }) }}> 
                X 
            </button>
          </div>
        </div>

      }
        
      <form onSubmit={handleSubmit}>
        <div className="text">

          <input type="text" placeholder="Type a message..." name='text' value={formData.text} onChange={(evt)=>handleTextChange(evt)} />

        </div>
        <label htmlFor="image-button">
            <input type="file" name="image" className='hidden' ref={imageHandle} onChange={handleImageChange}/>
            <button id="image-button" type='button' onClick={()=>imageHandle.current?.click() } > <Image size={20} />  </button>
        </label>


       {
          loading ?
          <Loader className="size-10 animate-spin"/>:

        <button type="submit" style={{width:"100px",backgroundColor:'green',color:'white'}} onClick={()=>handleSubmit}>
          <Send size={22} />
        </button>
        }


      </form>



    </div>









    </div>
  )
}

export default MessagePatient