import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

let secret;
if (process.env.NODE_ENV === 'test') {
  secret = 'test';
} else {
  secret = process.env.JWT_SECRET_KEY;
}

export default function (req, res, next) {
  try {
    // fetch token from header
    const token = req.headers.authorization.split(' ')[1] || req.body.token || req.query.token || req.headers['x-access-token'];
    // use jwt.verify to verify sent token
    const decoded = jwt.verify(token, secret);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed',
    });
  }
};
