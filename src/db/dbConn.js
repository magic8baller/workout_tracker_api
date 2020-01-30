import dotenv from 'dotenv';
import pg from 'pg';

const { Pool } = pg;
dotenv.config();

let pool; // eslint-disable-line import/no-mutable-exports

if (process.env.NODE_ENV === 'production') {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
} else {
  pool = new Pool({
    connectionString: process.env.DEV_CONNSTRING,
  });
}

export default pool;
