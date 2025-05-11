import express from 'express';

const router = express.Router();


import { userAuthMiddleware } from '../middlewares/jwtAuth.js';

import { bookAppointment, getAllAppointments } from '../controllers/appointmentController.js';


router.post('/book-appointment',userAuthMiddleware,bookAppointment);
router.get('/all-appointments',userAuthMiddleware,getAllAppointments);




export default router;