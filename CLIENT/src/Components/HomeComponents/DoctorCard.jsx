import React from 'react'



import '../../Pages/CSS/Home.css';



const DoctorCard = ( {name="Dr. Richard",image="/user.png",speciality="General Physician", onClick, available='true'} ) => {
  return (
    <>
        <div className="doctor" onClick={onClick}>

            <div className="img">
                  <img src={image} alt="DoctorImage" />
            </div>
      
            <div className="available">
              {/* <span className='dot'> </span>
              <span> Available </span> */}

            {
                available ?
                <>
                  <span className='dot'> </span>
                  <span> Available </span>
                </>
                :
                <>
                  <span className='dot' style={{backgroundColor:"red"}} > </span>
                  <span className='text-red-500'> Un-Available </span>
                </>
                
              }
            </div>
      
            <h2 className="name"> {name} </h2>
            <p className="speciality"> {speciality} </p>

        </div>
    </>
  )
}

export default DoctorCard