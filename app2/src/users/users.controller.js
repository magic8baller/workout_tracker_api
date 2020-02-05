import db from '../db/dbPool.js';
import AuthHelper from '../_helpers/AuthHelper.js';
import logger from '../log/logger.js';

const currentTime = new Date().toISOString();
const User = {
	async create(req, res) {
		if (!req.body.email || !req.body.password) {
			throw new Error('Invalid credentials')
		}

		if (!AuthHelper.isValidEmail(req.body.email)) {
			throw new Error('Invalid email address')
		}

		const hashPassword = await AuthHelper.hashPassword(req.body.password);

		const createQuery = 'INSERT INTO account(username, firstname, surname, email, password, user_role, created_date, modified_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
		const values = [req.body.username, req.body.firstname, req.body.surname, req.body.email, hashPassword, req.body.userRole, currentTime, currentTime];

		const {rows} = await db.query(createQuery, values);
		const token = await AuthHelper.generateToken(rows[0].id, rows[0].userRole); logger.info({
			label: "user-created",
			message: `${rows[0].id}: ${rows[0].username}`
		});

		return res.status(201).send({token});

	},

	async login(req, res) {
		if (!req.body.email || !req.body.password) {
			return res.status(400).send({message: 'Invalid credentials'});
		}
		if (!AuthHelper.isValidEmail(req.body.email)) {
			return res.status(400).send({message: 'Please enter a valid email address'});
		}
		const findUserQuery = 'SELECT * FROM account WHERE email = $1';
		const {rows} = await db.query(findUserQuery, [req.body.email]);
		if (!rows[0]) {
			return res.status(400).send({message: 'Invalid credentials'});
		}
		if (!AuthHelper.comparePassword(req.body.password, rows[0].password)) {
			return res.status(400).send({message: 'Invalid credentials'});
		}
		const token = AuthHelper.generateToken(rows[0].id, rows[0].userRole);
		logger.info({
			label: "user-login",
			message: rows[0].username
		});
		return res.status(201).send({token});
	},

	async delete(req, res) {
		const deleteQuery = 'DELETE FROM account WHERE id=$1 returning *';
		const {rows} = await db.query(deleteQuery, [req.user.id]);
		if (!rows[0]) {
			return res.status(400).send({message: 'User not found'});
		}
		logger.info({
			label: "user-deleted",
			message: req.user.id
		});
		return res.status(204).send({message: 'User deleted'});
	}
}

export default User;