import React from 'react'

import '../CSS/AddDoctor.css';

import { useState, useContext } from 'react';

import { toast } from 'react-toastify';

import { AdminContext } from '../../context/AdminContext';


import { Loader } from 'lucide-react';







const AddDoctor = () => {

    const [doctorDetails,setDoctorDetails] = useState({
        profilePic:"",
        fullName:"",
        email:"",
        password:"",
        speciality:"",
        degree:"",
        address:{
            line1:"",
            line2:""
        },
        experience:"",
        fees:"",
        about:""
    })


    const { backend_URL } = useContext(AdminContext);

    const [loading,setLoading] = useState(false);


    const handleTakeInput = (evt)=>{
        const name = evt.target.name;
        const value = evt.target.value;



        if(name=='line1' || name=='line2'){
            setDoctorDetails((prev)=>{
                return {...prev, address:{...prev.address, [name]:value} };
            })
            return;
        }

        setDoctorDetails((prev)=>{
            return {...prev,[name]:value};
        })
    }

    const handleProfileInput = (evt)=>{
        const image = evt.target.files[0];
        if(!image){
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(image);

        reader.onload = async ()=>{
            const base64Image = reader.result;
            setDoctorDetails((prev)=>{
                return {...prev,profilePic:base64Image};
            })
        }
        
    }


    const handleSubmit = async (evt)=>{
        evt.preventDefault();
        if( !doctorDetails.profilePic || doctorDetails.profilePic===""){
            console.log("I'm Inside No Profile Pic");
            toast.warn('Profile Pic is mandatory');
            return;
        }

        if(!doctorDetails.fullName || !doctorDetails.email || !doctorDetails.about || !doctorDetails.password || !doctorDetails.degree || !doctorDetails.address.line1 || !doctorDetails.speciality || !doctorDetails.experience || !doctorDetails.fees){
            toast.warn('All Details Are Mandatory');
        }

        // toast.success("Doctor Added SuccessFully");
        // console.log("All Lists Includes ",doctorDetails);

        try{
            setLoading(true);
            const fetchOptions = {
                method:"POST",
                credentials:"include",
                headers:{
                    "Content-Type":'application/json'
                },
                body:JSON.stringify(doctorDetails),
            }

            const response = await fetch(`${backend_URL}/api/admin/addDoctor`,fetchOptions);
            const data = await response.json();

            console.log("Data Gotten ", data);
            if(data.success){
                toast.success(data.message);

                setDoctorDetails({
                    profilePic:"",
                    fullName:"",
                    email:"",
                    password:"",
                    speciality:"",
                    degree:"",
                    address:{
                        line1:"",
                        line2:""
                    },
                    experience:"",
                    fees:"",
                    about:""
                })

            }else{
                console.log(data.message);
                toast.error(data.message);
            }


        }catch(error){
            toast.error(`Error in Frontend Doctor Creation ${error}`);
        }finally{
            setLoading(false);
        }


    }



  return (
    <div className='addDoctor-container'>

        <h1> Add Doctor </h1>

        <form onSubmit={handleSubmit}>

            <div className="image">     
                <img src={ doctorDetails.profilePic ?  doctorDetails.profilePic :  "/user.png"} alt="user" />
                <label htmlFor="upload">
                    <input type="file" name="profilePic" id="upload" className='hidden' onChange={handleProfileInput}/>  <p>  Upload Doctor Picture </p>
                </label>
            </div>

            <div className="input-container">

                <div className="feild">
                    <p> Doctor Name</p>
                    <input type="text" name="fullName" id="name" placeholder='Name' required value={doctorDetails.fullName} onChange={handleTakeInput}/>
                </div>
                <div className="feild">
                    <p> Speciality </p>
                    {/* <input type="text" name="fullName" id="name" placeholder='Name'/> */}
                    <select name="speciality" required onChange={handleTakeInput} value={doctorDetails.speciality}>
                        <option value=""> Not Selected </option>
                        <option value="General Physician"> General Physician </option>
                        <option value="Gynecologist"> Gynecologist </option>
                        <option value="Dermatologist"> Dermatologist </option>
                        <option value="Pediatricians"> Pediatricians </option>
                        <option value="Neurologist"> Neurologist </option>
                        <option value="Gastroenterologist"> Gastroenterologist </option>
                    </select>
                </div>

            </div>


            <div className="input-container">

                <div className="feild">
                    <p> Doctor Email</p>
                    <input type="email" name="email" id="email" placeholder='E-mail' value={doctorDetails.email} required onChange={handleTakeInput}/>
                </div>
                <div className="feild">
                    <p> Education </p>
                    <input type="text" name="degree" id="edu" placeholder='Degree' value={doctorDetails.degree} required onChange={handleTakeInput}/>
                </div>

            </div>

            <div className="input-container">

                <div className="feild">
                    <p> Doctor Pass Word</p>
                    <input type="password" name="password" id="password" placeholder='Password' value={doctorDetails.password} required onChange={handleTakeInput}/>
                </div>
                <div className="feild">
                    <p> Address </p>
                    <input type="text" name="line1" id="add1" placeholder='Address 1' value={doctorDetails.address.line1} required onChange={handleTakeInput}/>
                    <input type="text" name="line2" id="add2" placeholder='Address 2' value={doctorDetails.address.line2} onChange={handleTakeInput}/>
                </div>

            </div>

            <div className="input-container">

                <div className="feild">
                    <p> Doctor Experience </p>
                     <select name="experience" required onChange={handleTakeInput} value={doctorDetails.experience}>
                        <option value=""> Not Selected </option>
                        <option value="1 Year"> 1 Year </option>
                        <option value="2 Year"> 2 Year </option>
                        <option value="3 Year"> 3 Year </option>
                        <option value="4 Year"> 4 Year </option>
                        <option value="5 Year"> 5 Year </option>
                        <option value="6 Year"> 6 Year </option>
                        <option value="7 Year"> 7 Year </option>
                        <option value="8 Year"> 8 Year </option>
                        <option value="9 Year"> 9 Year </option>
                        <option value="10 Year"> 10 Year </option>
                        
                    </select>
                </div>

            </div>

            <div className="input-container">

                <div className="feild">
                    <p> Doctor Fees </p>
                    <input type="number" name="fees" id="fees" placeholder='Fees' value={doctorDetails.fees} required onChange={handleTakeInput}/>
                </div>

            </div>

            <h1 className='mt-5'> About Doctor </h1>
            
            <div className="flex flex-col gap-5">


            <textarea name="about" id="about" rows='10' cols='20' placeholder='Write About Doctor' value={doctorDetails.about} onChange={handleTakeInput}>
                
            </textarea>
            {
                loading?
                <Loader className="size-10 animate-spin"/>
                :<button className='w-50 mb-5' onClick={handleSubmit}> Add Doctor </button>
            }

            </div>

        </form>

    </div>
  )
}

export default AddDoctor