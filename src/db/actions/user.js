/* eslint-disable no-tabs */
/* eslint-disable prettier/prettier */
import db from '../dbConn.js';

export const findAllUsersForAdmin = () => {
  const sql = `
		SELECT username, email, is_admin
		FROM users
		`;
  return db.query(sql);
};
export const findAllUsers = () => {
  const sql = `
		SELECT username
		FROM users
		`;
  return db.query(sql);
};
export const findUserByUsername = (username) => {
  const sql = `
		SELECT *
		FROM users
		WHERE username=$1
		`;
  return db.query(sql, [username]);
};

export const verifyUserByUsernameOrEmail = (username, email) => {
  const sql = `
		SELECT username, email
		FROM users
		WHERE username=$1
		OR email=$2
	`;
  return db.query(sql, [username, email]);
};
export const findUserById = (id) => {
  const sql = `
		SELECT *
		FROM users
		WHERE id=$1
		`;
  return db.query(sql, [id]);
};
export const createUser = (username, password, email) => {
  const sql = `
		INSERT INTO users
		(username, password, email)
    VALUES ($1, $2, $3)
    `;
  return db.query(sql, [username, password, email]);
};

export const updateUserPassword = (hashedPassword, id) => {
  const sql = `
		UPDATE users
		SET password=$1
		WHERE id=$2
    `;
  return db.query(sql, [hashedPassword, id]);
};
export const updateUserEmail = (email, id) => {
  const sql = `
		UPDATE users
		SET email=$1
		WHERE id=$2
    `;
  return db.query(sql, [email, id]);
};
export const removeUserFromDb = (id) => {
  const sql = `
    DELETE
    FROM users
    WHERE id=$1
    `;
  return db.query(sql, [id]);
};


export const userDb = {
  findAllUsersForAdmin,
  findAllUsers,
  findUserByUsername,
  verifyUserByUsernameOrEmail,
  findUserById,
  createUser,
  updateUserPassword,
  updateUserEmail,
  removeUserFromDb,
};
