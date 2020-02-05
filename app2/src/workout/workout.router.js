import express from 'express';
import workoutsController from './workouts.controller.js';

const router = express.Router();

router.route('/')
	.get(workoutsController.getAll)
	.post(workoutsController.create)

router.route('/:id')
	.get(workoutsController.getOne)
	.put(workoutsController.update)
	.delete(workoutsController.delete)


export default router;
