import express from 'express';

const router = express.Router();



import { AddNewDoctor, login, adminAuthCheck, logOut, getAllDoctors, getAllPatients, changeDoctorAvailability, deleteDoctor, cancelAppointment } from '../controllers/adminControllers.js';

import { getAllAppointments } from '../controllers/appointmentController.js'; 



import { adminAuthMiddleware } from '../middlewares/jwtAuth.js';



router.post('/login',login);
router.post('/addDoctor',adminAuthMiddleware, AddNewDoctor);
router.get('/getDoctors',adminAuthMiddleware,getAllDoctors);
router.get('/getPatients',adminAuthMiddleware,getAllPatients);
router.get('/logOut',adminAuthMiddleware,logOut);
router.put('/changeAvailability/:doctorId',adminAuthMiddleware,changeDoctorAvailability);
router.get('/allAppointments',adminAuthMiddleware,getAllAppointments);
router.delete('/deleteDoctor/:doctorId',adminAuthMiddleware,deleteDoctor);
router.delete('/cancelAppointment',adminAuthMiddleware,cancelAppointment);



router.get('/authCheck',adminAuthMiddleware,adminAuthCheck);







export default router;