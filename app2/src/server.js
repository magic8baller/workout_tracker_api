import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import errorHandler from './_helpers/errorHandler.js';
import userRouter from './users/user.router.js'
import exerciseRouter from './exercise/exercise.router.js'
import Auth from './_helpers/verifyToken.js';
const app = express();

app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());


app.use('/api/users', userRouter);
app.use('/api/exercises', Auth.verifyToken, exerciseRouter);
// app.use((req, res, next) => {
// 	next(createError(404))
// })
app.use(errorHandler);

app.get('/', (req, res, next) => {
	return res.status(200).json({message: 'API WORKS'});
})

const port = process.env.NODE_ENV === 'production' ? 80 : 5000;

export const startServer = async () => {
	app.listen(port, () => {
		console.log('Server listening on port ' + port);
	})
};