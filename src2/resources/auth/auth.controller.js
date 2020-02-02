/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../../db/dbConn.js.js';
import logger from '../../logging/logger.js.js';
import pool from '../../db/dbConn.js.js';


/**
 * @namespace /api/register
 * @method POST
 * @description Register user
 * @public
 */

 export const register = async (request, response) => {
	 const {username, email, password, role} = request.body;
	const result = await db.query('SELECT * FROM users WHERE email = $1', [email])
	const isUserInDb = result.rowCount > 0;
	if (isUserInDb){
    return response
      .status(409)
      .json({ status: 'failed', message: 'user already exists' });
 } else {
	 const hashedPassword = await bcrypt.hash(password, 10);

 }
}

/**
 * @namespace /api/login
 * @method POST
 * @description Log in user
 * @public
 */

export const loginUser = async (request, response) => {
	const sql = `
		SELECT *
		FROM users
		WHERE username=$1
		`;
  const { username, password: incomingPassword } = request.body;
	const result = await db.query(sql, [username]);

  const isUserInDb = result.rowCount > 0;
  if (!isUserInDb) return response.status(400).send('Invalid user credentials');

  const { password: storedPassword, is_admin } = result.rows[0]; // eslint-disable-line camelcase
  const doesPassMatch = await bcrypt.compare(incomingPassword, storedPassword);
  if (!doesPassMatch) {
    return response.status(400).send('Invalid password');
  }

  const token = jwt.sign({ username, is_admin }, process.env.JWT_KEY);

  response
    .header('x-auth-token', token)
    .header('access-control-expose-headers', 'x-auth-token')
    .status(200)
    .send('Valid user and password');
  logger.info({ label: 'login', message: username });
};
export const authController = {
  logoutUser,
  loginUser,
};
