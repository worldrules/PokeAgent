import express from 'express';
import { sendMessage } from '../controller/message.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/send/:userId', protectRoute, sendMessage)

export default router