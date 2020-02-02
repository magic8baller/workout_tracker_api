import express from 'express';
import { authController } from './auth.controller.js.js';

const router = express.Router();

router.get('/logout', authController.logoutUser);
router.post('/login', authController.loginUser);

export default router;
