import db from '../db/dbPool.js';
import logger from '../log/logger.js';
const currentTime = new Date().toISOString();

const workoutsController = {

	async create (req, res) {
		const createQuery = `INSERT INTO workout(name, "exerciseId", "weightKg", "totalSets", "totalReps",
		rest, duration, notes,favorite, "workoutDate", created_date, modified_date, "userId") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) returning *`;
		const values = [req.body.name, req.body.exerciseId, req.body.weightKg, req.body.totalSets, req.body.totalReps, req.body.rest, req.body.duration, req.body.notes, req.body.favorite, req.body.workoutDate, currentTime, currentTime, req.user.id];
		const {rows} = await db.query(createQuery, values)
		logger.info({
			label: "workout-created",
			message: rows[0].id
		});
		return res.status(201).send(rows[0]);
	},

	async getAll (req, res) {
		const findAllQuery = `SELECT workout.id, workout.name, workout."exerciseId", workout."weightKg", workout."totalSets",workout."totalReps",
		workout.rest, workout.duration, workout.notes, workout.favorite, workout."workoutDate", workout."userId", exercise.title, exercise.id FROM workout JOIN exercise ON workout."exerciseId" = exercise.id WHERE workout."userId"=$1 ORDER BY "workoutDate" DESC`;
		const {rows, rowCount} = await db.query(findAllQuery, [req.user.id]);
		logger.info({
			label: "workout-getAll",
			message: req.user.id
		});
		return res.status(200).send({rows, rowCount});
	},

	async getOne (req, res) {
		const getOneQuery = 'SELECT * FROM workout WHERE id=$1 AND "userId"=$2';
		const {rows} = await db.query(getOneQuery, [req.params.id, req.user.id]);
		if (!rows[0]) {
			return res.status(404).send({message: 'workout record not found'});
		}
		logger.info({
			label: "workout-getOne",
			message: req.params.id
		});
		return res.status(200).send(rows[0]);
	},

	async update (req, res) {
		const findOneQuery = 'SELECT * FROM workout WHERE id=$1 AND "userId"=$2';
		const updateOneQuery = 'UPDATE workout SET title=$1, rest=$2, favorite=$3, modified_date=$4 WHERE id=$5 AND "userId"=$6 RETURNING *';
		const {rows} = await db.query(findOneQuery, [req.params.id, req.user.id])
		if (!rows[0]) {
			return res.status(404).send({message: 'workout record not found'});
		}
		const values = [req.body.title || rows[0].title, req.body.rest || rows[0].rest, req.body.favorite || rows[0].favorite, currentTime, req.params.id, req.user.id];
		const response = await db.query(updateOneQuery, values);
		c
		return res.status(200).send(response.rows[0]);
	},

	async delete (req, res) {
		const deleteQuery = 'DELETE FROM workout WHERE id=$1 AND "userId"=$2 RETURNING *';
		const {rows} = await db.query(deleteQuery, [req.params.id, req.user.id]);
		if (!rows[0]) {
			return res.status(404).send({message: 'workout record not found'});
		}
		logger.info({
			label: "workout-deleted",
			message: req.params.id
		});
		return res.status(204).send({message: 'workout record deleted'});
	}
}

export default workoutsController;