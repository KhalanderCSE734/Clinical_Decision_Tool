import JWT from 'jsonwebtoken';

import 'dotenv/config';

const setUserTokenAndCookie = async (user,res)=>{
    const payLoad = {
        userId:user._id,
    }

    const token = JWT.sign(payLoad,process.env.JWT_Secret_Key,{expiresIn:'7d'});

    res.cookie('JWT_User',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV !== 'development',
        sameSite:process.env.NODE_ENV !== 'development' ? 'none' : 'strict',
        maxAge:7 * 24 * 60 * 60 * 1000, 
    })

}



const userAuthMiddleware = async (req,res,next)=>{
    try{

        const token = req.cookies.JWT_User;

        if(!token){
            return res.json({success:false,message:`Your Session Has Been Expired, Please Try Login Again`});
        }
        
        const user = JWT.verify(token,process.env.JWT_Secret_Key);
        // console.log(user);
        /**
         * {
            userId: '6818d1631ba2d662e0c19406',
            iat: 1746466226,
            exp: 1747071026
           }
         */
        if(user.userId){
            req.user = user.userId;
        }else{
            return res.json({success:false,message:`User is Not Authorized Login Again Please`});
        }
        
        next();
        
    }catch(error){
        return res.json({success:false,message:`Error In User Authentication Middleware ${error}`});
    }

}



// Tokens For Admin




const generateTokenForAdmin = async (res)=>{
    const payLoad = {
        mail:process.env.ADMIN_EMAIL,
    }

    const token = JWT.sign(payLoad,process.env.JWT_Secret_Key,{expiresIn:'1d'});

    res.cookie('JWT_Admin',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV !== 'development',
        sameSite:process.env.NODE_ENV !== 'development' ? 'none' : 'strict',
        maxAge:1 * 24 * 60 * 60 * 1000, 
    });

}


const adminAuthMiddleware = async (req,res,next)=>{
    try{

        const token = req.cookies.JWT_Admin;

        if(!token){
            return res.json({success:false,message:`Admin Session Has Been Expired, Please Try Login Again`});
        }
        
        const admin = JWT.verify(token,process.env.JWT_Secret_Key);
        
        if(admin.mail){
            req.adminMail = admin.mail;
        }else{
            return res.json({success:false,message:`Admin is Not Authorized Login Again Please`});
        }
        
        next();
        
    }catch(error){
        return res.json({success:false,message:`Error In Admin Authentication Middleware ${error}`});
    }
}





// Token For Doctor


const setDoctorTokenAndCookies = async (doctor,res)=>{
    const payLoad = {
        doctorId:doctor._id,
    }

    const token = JWT.sign(payLoad,process.env.JWT_Secret_Key,{expiresIn:'1d'});

    res.cookie('JWT_Doctor',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV !== 'development',
        sameSite:process.env.NODE_ENV !== 'development' ? 'none' : 'strict',
        maxAge: 1 * 24 * 60 * 60 * 1000, 
    });

}


const doctorAuthMidlleware = async (req,res,next)=>{
    try{

        const token = req.cookies.JWT_Doctor;

        if(!token){
            return res.json({success:false,message:`Doctor Session Has Been Expired, Please Try Login Again`});
        }
        
        const doctor = JWT.verify(token,process.env.JWT_Secret_Key);
        
        if(doctor.doctorId){
            req.doctor = doctor.doctorId;
        }else{
            return res.json({success:false,message:`Doctor is Not Authorized Login Again Please`});
        }
        
        next();
        
    }catch(error){
        return res.json({success:false,message:`Error In Doctor Authentication Middleware ${error}`});
    }
}




export { setUserTokenAndCookie, userAuthMiddleware, generateTokenForAdmin, adminAuthMiddleware, setDoctorTokenAndCookies, doctorAuthMidlleware };