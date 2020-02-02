import expressJwt from 'express-jwt';
import dotenv from 'dotenv';
dotenv.config();
const {JWT_SECRET} = process.env

function authorize (roles = []) {
	// roles param can be a single role string (e.g. Role.User or 'User')
	// or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
	if (typeof roles === 'string') {
		roles = [roles];
	}

	return [
		// authenticate JWT token and attach user to request object (req.user)
		expressJwt({secret: JWT_SECRET}),

		 // authorize based on user role
		(req, res, next) => {
			if (roles.length && !roles.includes(req.user.role)) {
				//user's role is unauthorized
				return res.status(401).json({message: 'Unauthorized'});
			}
			// authent. and authoriz. successful
			next();
		}
	]
}

export default authorize;