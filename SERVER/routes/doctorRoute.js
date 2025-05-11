import express from 'express';

const router = express.Router();



import { login, logOut, doctorAuthCheck, getCurrentDoctor, getAllAppointments, cancelAppointment, completeAppointment, updateProfile } from '../controllers/doctorControllers.js';


import { doctorAuthMidlleware } from '../middlewares/jwtAuth.js';


router.post('/login',login);
router.post('/logOut',doctorAuthMidlleware,logOut);
router.get('/doctorAuth',doctorAuthMidlleware,doctorAuthCheck);
router.get('/getCurrentDoctor',doctorAuthMidlleware,getCurrentDoctor);
router.get('/allAppointments',doctorAuthMidlleware,getAllAppointments);
router.put('/updateProfile',doctorAuthMidlleware,updateProfile);

router.put('/cancelAppointment',doctorAuthMidlleware,cancelAppointment);
router.put('/completeAppointment',doctorAuthMidlleware,completeAppointment);






export default router;