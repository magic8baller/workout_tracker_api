/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userDb as db } from '../../db/actions/user.js';
import logger from '../../logging/logger.js';
/**
 * @namespace /api/logout
 * @method GET
 * @description Log out user
 * @public
 */

export const logoutUser = (request, response) => {
  const { username } = request.query;
  logger.info({ label: 'logout', message: username });
  response.status(200).send('User logged out');
};

/**
 * @namespace /api/login
 * @method POST
 * @description Log in user
 * @public
 */

export const loginUser = async (request, response) => {
  const { username, password: incomingPassword } = request.body;
  const result = await db.findUserByUsername(username);

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
