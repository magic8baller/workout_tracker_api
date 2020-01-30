import express from 'express';
import userProtector from '../../middleware/userProtector.js';
import adminProtector from '../../middleware/adminProtector.js';
import { logController } from './log.controller.js';

const router = express.Router();

router.get('/', [userProtector, adminProtector], logController.getLogs);

export default router;
