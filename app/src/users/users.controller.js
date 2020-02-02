import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import createError from 'http-errors';
import authorize from '../_helpers/authorize.js';
import Role from '../_helpers/role.js';
import bcrypt from 'bcrypt';
import asyncHandler from '../_helpers/asyncHandler.js';
import db from '../db/dbPool.js';
const router = express.Router();
const {JWT_SECRET} = process.env;
export const authenticate = asyncHandler(async (req, res) => {
	const userResult = await db.query('SELECT * FROM account WHERE email = $1', [req.body.email])
	if (!userResult.rows.length > 0) throw createError(404, `User not found`)

	const hash = userResult.rows[0].password;
	const isPasswordMatch = await bcrypt.compare(req.body.password, hash)
	if (!isPasswordMatch) throw createError(400, 'Invalid password');
	const token = jwt.sign({sub: userResult.rows[0].id, role: userResult.rows[0].userRole}, JWT_SECRET);
	const {password, ...userWithoutPassword} = userResult.rows[0]
	res.json({...userWithoutPassword, token})
})

export const register = asyncHandler(async (req,res) => {

	const newUserResult = db.query('SELECT * FROM account WHERE email = $1' [req.body.email]);
	if (newUserResult.rows >= '1' ) throw createError(409, 'User already exists in db.');
	const {firstName, surname, username, email, userRole, id} = req.body;
	const hashedPassword = await bcrypt.hash(req.body.password, 10);
	await db.query('INSERT INTO account(firstName, surname, username, email, password, userRole) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [firstName, surname, username, email, hashedPassword, userRole])
	const {password, ...userWithoutPassword} = newUserResult.rows[0]
	const token = jwt.sign({sub: id, role: userRole}, JWT_SECRET);
res.json({message: 'Accound created', user: userWithoutPassword,
token})
});


export const getAll = asyncHandler(async (req, res) => {
	const {rows} = await db.query('SELECT * FROM account');
	if (!rows) throw createError(404, `No users found`)
	res.json({data: rows});
})
export const getById = asyncHandler(async (req, res) => {
	const currentUser = req.user;
	const id = parseInt(req.params.id, 10);

	// only allow admins to access other user records:
	if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
		throw createError(404, `Unauthorized to access these resources`)
	}

	const {rows} = await db.query('SELECT * FROM account WHERE id = $ 1', [id])
	if (!rows) throw createError(404, 'User not found')
	res.json({data: rows[0]})
});

//

router.post('/register', register)
router.post('/authenticate', authenticate); // public route
router.get('/', authorize(Role.Admin), getAll); // admin only route
router.get('/:id', authorize(), getById); // all authenticated users

export default router;