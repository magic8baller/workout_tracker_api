import fs from 'fs';

/**
 * @namespace /api/log
 * @method GET
 * @description Retrieve application log
 * @private admin
 */
export const getLogs = (request, response) => {
  const logfile = fs.readFileSync('logging/info.log', 'utf8');
  const arrayedLogfile = `[${logfile}]`;
  const commaSeparatedLogfile = arrayedLogfile
    .replace(/\n/g, ',')
    .replace(',]', ']');
  response.status(200).send(commaSeparatedLogfile);
};

export const logController = { getLogs };
