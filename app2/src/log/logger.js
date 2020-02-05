import winston from 'winston';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const filterByLevel = level =>
	winston.format(info => {
		if (info.level === level) {
			delete info.level;
			return info;
		}
	})();

const logger = winston.createLogger({
	transports: [
		new winston.transports.File({
			level: 'error',
			format: winston.format.combine(
				filterByLevel('error'),
				winston.format.timestamp(),
				winston.format.json(),
				winston.format.prettyPrint()
			),
			filename: `${__dirname}/error.log`,
			timestamp: true,
		}),
		new winston.transports.File({
			level: 'info',
			format: winston.format.combine(
				filterByLevel('info'),
				winston.format.timestamp(),
				winston.format.json()
			),
			filename: `${__dirname}/info.log`,
		}),
	],
});

process.on('uncaughtException', error => {
	logger.log('error', error.message); // logs out-of-request errors
	process.exit(1);
});

process.on('unhandledRejection', error => {
	logger.log('error', error.message); // logs rejected promises
	process.exit(1);
});

export default logger;
