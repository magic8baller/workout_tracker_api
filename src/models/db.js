import pg from 'pg';
import dotenv from 'dotenv'
dotenv.config();

// let myDatabase;

// if (process.env.NODE_ENV === 'development') {
//   myDatabase = process.env.DEVPOSTGRES_DB;
// } else if (process.env.NODE_ENV === 'test') {
//   //change on deployment and testing //myDatabase = 'travis';]
//   myDatabase = process.env.TESTPOSTGRES_DB;
// } else if (process.env.NODE_ENV === 'production') {
//   myDatabase = process.env.POSTGRES_DB;
// }

const config = {
	user: process.env.DB_USER,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	host: 'localhost',
	port: 5432,
	max: 10, // max number of clients in the pool
	idleTimeoutMillis: 30000,
};


export default new pg.Pool(config);