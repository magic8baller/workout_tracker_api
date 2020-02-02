/* eslint-disable no-unused-vars */
import logger from '../logging/logger.js.js';

const errorHandler = (error, request, response, next) => {
  logger.log({ level: 'error', message: error.message });
  response.status(500).send('An error has occurred!');
};

export default errorHandler;
