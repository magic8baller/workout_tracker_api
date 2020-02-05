import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const AuthHelper = {

	hashPassword(password) {
		
		return bcrypt.hash(password, 10);
	},

	comparePassword(password, hashPassword) {
		return bcrypt.compare(password, hashPassword);
	},

	isValidEmail(email) {
		return /\S+@\S+\.\S+/.test(email);
	},

	generateToken(id, role) {
		const token = jwt.sign({sub: id, role: role}, process.env.JWT_SECRET, {expiresIn: '1h'});
		return token;
	}
}

export default AuthHelper;