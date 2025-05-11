import express from 'express';

const router = express.Router();


import { signUp, login, logOut, checkPatientAuthorization, getCurrentPatient, updateProfile, showAllDoctors, tempShowAllDoctors, showSelectedPatientAppointment, cancelAppointment, createPaymentOrder, verifyRazorPayPayment } from '../controllers/patientControllers.js';

import { userAuthMiddleware } from '../middlewares/jwtAuth.js';




router.post('/signup',signUp);
router.post('/login',login);
router.put('/changeProfile',userAuthMiddleware,updateProfile);
router.get('/logOut',userAuthMiddleware,logOut);
router.get('/checkAuth',userAuthMiddleware,checkPatientAuthorization);
router.get('/getPatientDetails',userAuthMiddleware, getCurrentPatient);
router.get('/allAppointments',userAuthMiddleware,showSelectedPatientAppointment);
router.delete('/cancelAppointment',userAuthMiddleware,cancelAppointment);
router.get('/allDoctors',showAllDoctors);

router.post('/createOrderPayment',userAuthMiddleware,createPaymentOrder);
router.post('/verifyRazorPay',userAuthMiddleware,verifyRazorPayPayment);




router.get('/tempAllDoctors',tempShowAllDoctors);





export default router;