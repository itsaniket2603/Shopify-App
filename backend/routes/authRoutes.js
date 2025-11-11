import express from 'express';
import { install, callback } from '../controllers/authController.js';
const router = express.Router();

router.get('/install', install);
router.get('/callback', callback);

export default router;
