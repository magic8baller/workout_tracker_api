import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import createError from 'http-errors';
import errorHandler from './_helpers/errorHandler.js';
import userRoutes from './users/users.controller.js'
const app = express();

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


app.use('/api/users', userRoutes);
app.use((req, res, next) => {
	next(createError(404))
})
app.use(errorHandler);
const port = process.env.NODE_ENV === 'production' ? 80 : 5000;

export const startServer = async () => {
	app.listen(port, () => {
	console.log('Server listening on port ' + port);
})
};