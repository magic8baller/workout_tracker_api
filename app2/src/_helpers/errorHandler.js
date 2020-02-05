import logger from '../log/logger.js';
export default function (error, request, response, next) {
	if (error.message === 'access denied') {
		response.status(403);
		error.status = '403 Forbidden';
	}
	response.status(error.status || 500);
	response.json({
		status: error.status,
		message: error.message,
		stack: error.stack
	});
	logger.log({level: 'error', message: `Message: ${error.message}.\nError status: ${error.status || 500}.\nStack: ${error.stack}`});
};
