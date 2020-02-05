import express from 'express';
import exercisesController from './exercises.controller.js';

const router = express.Router();

router
	.get('/', exercisesController.getAll)
	.post('/', exercisesController.create)
	.get('/:id', exercisesController.getOne)
	.put('/:id', exercisesController.update)
	.delete('/:id', exercisesController.delete)


export default router;
