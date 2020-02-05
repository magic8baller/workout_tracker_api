import express from 'express';
import usersController from './users.controller.js';

import verifyToken from '../_helpers/verifyToken.js';
const router = express.Router();

router.post('/', usersController.create);
router.post('/login', usersController.login);
router.delete('/me', verifyToken, usersController.delete);


export default router;
