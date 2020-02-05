CREATE TABLE exercise (
	id 	          SERIAL PRIMARY KEY,
	title         VARCHAR(50),
	favorite      BOOLEAN NOT NULL DEFAULT false,
	created_date  TIMESTAMP,
	modified_date TIMESTAMP,
	"userId"      INTEGER NOT NULL,
	FOREIGN KEY ("userId") REFERENCES account (id) ON DELETE CASCADE
);
