


import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';






import { connectMongoDB } from './config/connections.js';

import adminRouter from './routes/adminRoute.js';

import doctorRouter from './routes/doctorRoute.js';

import patientRouter from './routes/patientRoute.js';

import appointmentRouter from './routes/appointmentsRoute.js';


import messageRouter from './routes/messageRoute.js';






const app = express();
const PORT = process.env.PORT || 8000 ;


const corsOptions = {
    origin:[process.env.FRONT_END_URL,process.env.FRONT_END_URL_ADMIN],
    // methods:"GET , POST , PUT ,DELETE, PATCH, HEAD",
    methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true,
}

app.use(cors(corsOptions));


app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());





connectMongoDB(process.env.MONGODB_URI).then(()=>{
    console.log(`DataBase (MongoDB) Connected Successfully`);
}).catch((error)=>{
    console.log(`Error In DataBase Connection, ${error}`);
})



  




app.get("/",(req,res)=>{
    res.send(`<h1> Getting Started With BackEnd Of my Doctor Application </h1>`)
})


app.use('/api/admin',adminRouter);


app.use('/api/doctor',doctorRouter);


app.use('/api/patient',patientRouter);


app.use('/api/appointment',appointmentRouter);


app.use('/api/messages',messageRouter);




app.listen(PORT,()=>{
    console.log(`Server Started At PORT ${PORT}`);
})