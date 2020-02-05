import db from '../db/dbPool.js';
import logger from '../log/logger.js';
const currentTime = new Date().toISOString();
const exercisesController = {

	async create(req, res) {
		const createQuery = `INSERT INTO exercise(title, favorite, created_date, modified_date, "userId") VALUES ($1, $2, $3, $4, $5) returning *`;
		const values = [req.body.title, req.body.favorite, currentTime, currentTime, req.user.id];
		const {rows} = await db.query(createQuery, values)
		logger.info({
			label: "exercise-created",
			message: rows[0].id
		});
		return res.status(201).send(rows[0]);
	},

	async getAll(req, res) {
		const findAllQuery = 'SELECT * FROM exercise WHERE "userId" = $1';
		const {rows, rowCount} = await db.query(findAllQuery, [req.user.id]);
		logger.info({
			label: "exercise-getAll",
			message: req.user.id
		});
		return res.status(200).send({rows, rowCount});
	},

	async getOne (req, res) {
		const getOneQuery = 'SELECT * FROM exercise WHERE id=$1 AND "userId"=$2';
		const {rows} = await db.query(getOneQuery, [req.params.id, req.user.id]);
		if (!rows[0]) {
			return res.status(404).send({message: 'exercise record not found'});
		}
		logger.info({
			label: "exercise-getOne",
			message: req.params.id
		});
		return res.status(200).send(rows[0]);
	},

	async update(req, res) {
		const findOneQuery = 'SELECT * FROM exercise WHERE id=$1 AND "userId"=$2';
		const updateOneQuery = 'UPDATE exercise SET title=$1, favorite=$2, modified_date=$3 WHERE id=$4 AND "userId"=$5 RETURNING *';
		const {rows} = await db.query(findOneQuery, [req.params.id, req.user.id])
		if (!rows[0]) {
			return res.status(404).send({message: 'exercise record not found'});
		}
const values = [req.body.title || rows[0].title, req.body.favorite || rows[0].favorite, currentTime, req.params.id, req.user.id];
const response = await db.query(updateOneQuery, values);
	
return res.status(200).send(response.rows[0]);
	},

	async delete (req, res) {
		const deleteQuery = 'DELETE FROM exercise WHERE id=$1 AND "userId"=$2 RETURNING *';
		const {rows} = await db.query(deleteQuery, [req.params.id, req.user.id]);
		if (!rows[0]) {
			return res.status(404).send({message: 'exercise record not found'});
		}
		logger.info({
			label: "exercise-deleted",
			message: req.params.id
		});
		return res.status(204).send({message: 'exercise record deleted'});
	}
}

export default exercisesController;