#!/bin/bash

echo "Configuring workout_tracker_db"

dropdb -U stronger_malaka workout_tracker_db
createdb -U stronger_malaka workout_tracker_db

psql -U stronger_malaka workout_tracker_db < ./bin/sql/account.sql
psql -U stronger_malaka workout_tracker_db < ./bin/sql/exercise.sql
psql -U stronger_malaka workout_tracker_db < ./bin/sql/workout.sql

echo "workout_tracker_db created!"