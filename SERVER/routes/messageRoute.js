import express from 'express';

const router = express.Router();


import { doctorSendMessage, patientSendMessage, doctorGetMessages, patientGetMessages } from '../controllers/messageControllers.js';

import { userAuthMiddleware, doctorAuthMidlleware } from '../middlewares/jwtAuth.js';



router.post('/doctorSendMessage/:patientId',doctorAuthMidlleware,doctorSendMessage);
router.post('/patientSendMessage/:doctorId',userAuthMiddleware,patientSendMessage);
router.get('/doctorGetMessages/:patientId',doctorAuthMidlleware,doctorGetMessages);
router.get('/patientGetMessages/:doctorId',userAuthMiddleware,patientGetMessages);



export default router;