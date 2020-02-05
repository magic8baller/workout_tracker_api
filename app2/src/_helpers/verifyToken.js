import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
const {JWT_SECRET} = process.env

const Auth = {
	async verifyToken (req, res, next) {
	const token = req.headers.authorization.split(' ')[1];
	if (!token) {
		return res.status(400).send({message: 'Missing auth token'});
	}
	try {

		const decodedToken = await jwt.verify(token, JWT_SECRET);
		const findUserById = 'SELECT * FROM account WHERE id = $1';
		const {rows} = await db.query(findUserById, [decodedToken.sub]);
		if (!rows[0]) {
			return res.status(400).send({message: 'Invalid token'});
		}
		req.user = {id: decodedToken.sub}
		next();
	} catch (err) {
		return res.status(400).send(err);
	}

}
}

export default Auth;