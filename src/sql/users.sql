CREATE TABLE IF NOT EXISTS users(
	id SERIAL PRIMARY KEY,
	title VARCHAR(128) NOT NULL,
	firstname VARCHAR(128) NOT NULL,
	lastname VARCHAR(128) NOT NULL,
	email VARCHAR(128) NOT NULL,
	password VARCHAR(128) NOT NULL,
	role VARCHAR(128) NOT NULL,
	activationCode varchar(128) NOT NULL,
	isActivated VARCHAR(128) NOT NULL,
	created_date TIMESTAMP,
	modified_date TIMESTAMP
);