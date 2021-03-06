/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const userProtector = (request, response, next) => {
  const token = request.header('x-auth-token');
  if (!token) {
    return response.status(401).send('Unauthorized. No token provided.');
  }
  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_KEY);
    request.decodedPayload = decodedPayload; // username: string, is_admin: boolean
    next();
  } catch (error) {
    response.status(401).send('Unauthorized. Invalid token provided.');
  }
};

export default userProtector;
