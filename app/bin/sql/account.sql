CREATE TABLE account (
	id 						SERIAL PRIMARY KEY,
	username  		VARCHAR(128) NOT NULL,
	"firstName" 	VARCHAR(128) NOT NULL,
	surname 			VARCHAR(128) NOT NULL,
	email 				VARCHAR(128) NOT NULL,
	password 			VARCHAR(128) NOT NULL,
	"userRole" 		VARCHAR(128) NOT NULL DEFAULT 'User',
	created_date  TIMESTAMP,
	modified_date TIMESTAMP
);
