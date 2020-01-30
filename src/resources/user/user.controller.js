/* eslint-disable consistent-return */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userDb as db } from '../../db/actions/user.js';
import logger from '../../logging/logger.js';

/**
 * @namespace /api/users/all
 * @method GET
 * @description Get all user info
 * @access private
 * @admin only
 */
export const getAllUsers = async (request, response) => {
  const result = await db.findAllUsersForAdmin;
  const filteredArray = result.rows.filter(
    obj => obj.username !== 'masterhacker' // eslint-disable-line comma-dangle
  );
  response.status(200).json(filteredArray);
};

/**
 * @namespace /api/users/:id
 * @method PUT
 * @param {Integer} id
 * @description Update user info
 * @access private
 */

export const updateUser = async (request, response) => {
  const { username, password, email } = request.body;
  const id = parseInt(request.params.id);
  const passwordToBeUpdated = password !== undefined;
  const emailToBeUpdated = email !== undefined;
  if (passwordToBeUpdated) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    db.updateUserPassword(hashedPassword, id);
    response.status(200).send(`User ${id}: Password updated`);
    logger.info({
      label: 'password-updated',
      message: username,
    });
  } else if (emailToBeUpdated) {
    db.updateUserEmail(email, id);
    response.status(200).send(`User ${id}: Email updated`);
    logger.info({
      label: 'email-updated',
      message: username,
    });
  }
};

/**
 * @namespace /api/users/:id
 * @method DELETE
 * @param {Integer} id
 * @description Delete User from database
 * @access private
 */

export const deleteUser = (request, response) => {
  const { username } = request.body;
  const id = parseInt(request.params.id);
  db.removeUserFromDb(id);
  response.status(200).send(`Deleted user ${id}`);
  logger.info({
    label: 'user-deleted',
    message: username,
  });
};

/**
 * @namespace /api/users/:username
 * @method GET
 * @param {String} username
 * @description Get User by username
 * @access private
 */
export const getUserByUsername = async (request, response) => {
  const { username } = request.params;
  const result = await db.findUserByUsername(username);
  response.status(200).json(result.rows[0].id);
};

/**
 * @namespace /api/users/:id
 * @method POST
 * @param {Integer} id
 * @description Get User by ID
 * @access private
 */
export const getUserById = async (request, response) => {
  const userId = parseInt(request.params.id);
  const result = await db.findUserById(userId);
  response.status(200).json(result.rows[0]);
};

/**
 * @namespace /api/users
 * @method POST
 * @description log in with existing credentials or create account
 * @access public
 */
export const loginOrCreateUser = async (request, response) => {
  const {
    username,
    password: incomingPassword,
    email: incomingEmail,
  } = request.body;

  const result = await db.findUserByUsernameOrEmail;

  const usernameOrEmailAlreadyExists = result.rowCount > 0;
  if (usernameOrEmailAlreadyExists) {
    const storedUsername = result.rows[0].username;
    const storedEmail = result.rows[0].email;
    if (username === storedUsername) {
      return response.status(400).send('This username already exists.');
    }
    if (incomingEmail === storedEmail) {
      return response.status(400).send('This email already exists.');
    }
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(incomingPassword, salt);
  db.createUser(username, hashedPassword, incomingEmail);

  const token = jwt.sign({ username, is_admin: false }, process.env.JWT_KEY);

  response
    .header('x-auth-token', token)
    .header('access-control-expose-headers', 'x-auth-token')
    .status(201)
    .send(`Created user ${username}`);
  logger.info({
    label: 'user-created',
    message: username,
  });
};
export const userController = {
  updateUser,
  deleteUser,
  getAllUsers,
  loginOrCreateUser,
  getUserById,
  getUserByUsername,
};
