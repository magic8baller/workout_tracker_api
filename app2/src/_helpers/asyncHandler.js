import boom from 'boom';
const asyncHandler = fn => (req, res, next) => (
	Promise.resolve(fn(req, res, next)).catch(err => {
		if (!err.isBoom) return next(boom.badImplementation(err));
		next(err);
		if (err.routine === '_bt_check_unique') {
			return res.status(400).send({'message': 'User with that EMAIL already exist'})
		}
	})
);

export default asyncHandler;