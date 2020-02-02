import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const {Pool} = pg;

const {NODE_ENV, DB_CONNSTRING, DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT} = process.env;

let pool;

if (NODE_ENV === 'production') {
  pool = new Pool({connectionString: DB_CONNSTRING});
} else {
	pool = new Pool({
		user: DB_USER,
		password: DB_PASSWORD,
		database: DB_NAME,
		host: DB_HOST,
		port: DB_PORT});
}



export default ({
	query: (text, params) => pool.query(text, params),
});