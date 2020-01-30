/* eslint-disable prettier/prettier */
import express from 'express';
import adminProtector from '../../middleware/adminProtector.js';
import userProtector from '../../middleware/userProtector.js';
import { userController } from './user.controller.js';

const router = express.Router();

router.post('/', userController.loginOrCreateUser);
router.get('/all', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.get('/:username', userController.getUserByUsername);
router.put('/:id', userProtector, userController.updateUser);
router.delete('/:id', [userProtector, adminProtector], userController.deleteUser);

export default router;
