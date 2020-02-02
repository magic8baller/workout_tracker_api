import express from 'express';
import authController from '../controllers/auth.js';

const router = express.Router();

// vc = verificationCode

router.post('/signup', authController.register);
router.post('/login', authController.login);

router.put('/verify/:vc', authController.verify);

router.put('/generatevcode', authController.generateVCode);
router.post('/forgotpassword', authController.forgotPassword);
router.put('/changeforgotpassword', authController.changeForgotPassword);
router.post('/verifytoken', authController.verifyPasswordChangeToken);

export default router;
