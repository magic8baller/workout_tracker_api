CREATE TABLE workout (
	id 						SERIAL PRIMARY KEY,
	name 					VARCHAR(128) NOT NULL,
	"exerciseId"  INTEGER,
	"weightKg"    INTEGER,
	"totalSets"   INTEGER NOT NULL,
  "totalReps" 	INTEGER NOT NULL,
	duration 		  VARCHAR(50),
	notes 	      VARCHAR(250),
	rest          VARCHAR(128),
	favorite      BOOLEAN NOT NULL DEFAULT false,
	"workoutDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	created_date  TIMESTAMP,
	modified_date TIMESTAMP,
	"userId"      INTEGER NOT NULL,
	FOREIGN KEY ("exerciseId") REFERENCES exercise (id),
	FOREIGN KEY ("userId") REFERENCES account (id) ON DELETE CASCADE
);
