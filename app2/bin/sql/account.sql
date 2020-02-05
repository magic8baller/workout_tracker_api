CREATE TABLE account (
	id 						SERIAL PRIMARY KEY,
	username  		VARCHAR(128) UNIQUE NOT NULL,
	firstname 	VARCHAR(128) NOT NULL,
	surname 			VARCHAR(128) NOT NULL,
	email 				VARCHAR(128) UNIQUE NOT NULL,
	password 			VARCHAR(128) NOT NULL,
  user_role 		VARCHAR(128) NOT NULL DEFAULT 'User',
	created_date  TIMESTAMP,
	modified_date TIMESTAMP
);
