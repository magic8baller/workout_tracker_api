import dotenv from 'dotenv';
import pg from 'pg';
dotenv.config();

const { DB_USER, DB_PASSWORD, DB_NAME, NODE_ENV } = process.env;
const { Pool } = pg;

let pool; // eslint-disable-line import/no-mutable-exports

if (NODE_ENV === 'production') {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
} else {
  pool = new Pool({
    user: DB_USER,
    database: DB_NAME,
    password: DB_PASSWORD,
    host: 'localhost',
    port: 5432,
  });
}

pool.on('connect', () => {
	console.log('connected to the Database');
});

export default pool;
