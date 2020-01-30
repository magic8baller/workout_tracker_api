/* eslint-disable no-console */
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
// autopatch asyncErrorCatcher middleware onto all routes
import 'express-async-errors';
import helmet from 'helmet';
import morgan from 'morgan'; // eslint-disable-line import/no-extraneous-dependencies
import errorHandler from './middleware/errorHandler.js';
import authRouter from './resources/auth/auth.router.js';
// import exercisesRouter from './resources/exercise/exercise.router.js'
// import workoutsRouter from './resources/workout/workout.router.js'
import logRouter from './resources/log/log.router.js';
import usersRouter from './resources/user/user.router.js';

dotenv.config();

const app = express();

app.use(morgan());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.options('*', cors());
app.use('/api', authRouter);
app.use('/api/users', usersRouter);
// app.use("/api/exercises", exercisesRouter);
// app.use("/api/workouts", workoutsRouter);
app.use('/api/log', logRouter);
app.use(errorHandler);
app.use(helmet());

const PORT = process.env.PORT || 5000;
export default async () => {
  try {
    app.listen(PORT, () => console.log(`REST API at http://localhost:${PORT}`));
  } catch (error) {
    console.error(error);
  }
};
