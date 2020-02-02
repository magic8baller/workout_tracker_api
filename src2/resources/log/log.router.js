import express from 'express';
import userProtector from '../../middleware/userProtector.js.js';
import adminProtector from '../../middleware/adminProtector.js.js';
import { logController } from './log.controller.js.js';

const router = express.Router();

router.get('/', [userProtector, adminProtector], logController.getLogs);

export default router;
