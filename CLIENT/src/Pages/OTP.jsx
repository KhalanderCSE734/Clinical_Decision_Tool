import React from 'react'



import { useRef,useContext,useEffect } from 'react';

import './CSS/OTP.css';

import { AppContext } from '../Contexts/AppContext';

import { useNavigate } from 'react-router-dom';


const OTP = () => {

    const inputRefs = useRef([]);

    const { VerifyEmailOTP } = useContext(AppContext);

    const navigate = useNavigate()

    inputRefs.current[0]?.focus();
    const handleNextMove = (evt,ind)=>{
        // console.log(evt.target, " ind ", ind);
        // console.log(inputRefs.current.length);
        if(evt.target.value.length > 0 && ind < inputRefs.current.length - 1){
            inputRefs.current[ind+1].focus();
        }
        
    }

    const handlePreviousMove = (evt,ind)=>{
        // console.log("Key Is Pressed");
        // console.log(evt);
        if(evt.key === "Backspace" && evt.target.value == "" && ind>0){
            inputRefs.current[ind-1].focus();
        }
    }

    const handlePaste = (evt)=>{
        // console.log(evt);
        // console.log(evt.clipboardData.getData('text'));
        const clipBoardData = evt.clipboardData.getData('text');
        // console.log(clipBoardData.split(''));
        const splittedOTP = clipBoardData.split('');
        splittedOTP.forEach((char,ind)=>{
            if(inputRefs.current[ind]){
                // console.log(inputRefs.current[ind]);
                inputRefs.current[ind].value = Number(char);
                console.log(inputRefs.current[ind].value);
            }
        })
        inputRefs.current[inputRefs.current.length-1].focus();
    }


    const handleSubmitOTP = async (evt)=>{
        evt.preventDefault();
        let OTP = 0;
        inputRefs.current.forEach((cur)=>{
            OTP = (OTP * 10) + Number(cur.value);
            // console.log(cur.value);
        })
        // console.log(num);
        console.log(OTP);
        VerifyEmailOTP(OTP);
        // try{
        //     const fetchOptions = {
        //         method:"POST",
        //         credentials:"include",
        //         headers:{
        //             "Content-Type":"application/json",
        //         },
        //         body:JSON.stringify({OTP}),
        //     }

        //     const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verifyAccount`,fetchOptions);

        //     const data = await response.json();
        //     console.log(data);
        //     if(data.success){
        //         toast.success(data.message);
        //         getUserData();
        //         goHome('/');
        //     }else{
        //         toast.error(data.message);
        //         inputRefs.current[inputRefs.current.length-1].focus();
        //     }

        // }catch(error){
        //     toast.error(error.message);
        // }
    }


  return (
        <div className="OTP-login">
    
         <form className="login-div" onSubmit={handleSubmitOTP}>
             <h1>Email Verification OTP </h1>
            
            <p className="text-center text-black">Enter 6 Digit Code Sent To your E-mail ID</p>
            <div className="flex justify-center align-middle gap-4" onPaste={handlePaste} >
            {
                Array(6).fill(0).map((__,ind)=>{
                    return(
                        <input key={ind} type="text" maxLength={1} required className='h-10 w-10 bg-[palevioletred] text-center rounded-md' ref={(evt)=> { inputRefs.current[ind] = evt }} onInput={ (evt)=>{ handleNextMove(evt,ind)} } onKeyDown={ (evt)=>{ handlePreviousMove(evt,ind) } } />
                      )
                  })
              }
           </div>
            <button type="submit"> Verify E-mail</button>

            <p className='text-[.8rem] text-black'> OTP Expired ? <span className='text-blue-600 cursor-pointer' onClick={()=>navigate('/login')}> Back To Create Account </span> </p>
            <p className='text-[.8rem] text-black'> Entered Wrong Email ? <span className='text-blue-600 cursor-pointer' onClick={()=>navigate('/login')}> Back To Create Account </span> </p>
            
         </form>
           
    </div>
  )
}

export default OTP