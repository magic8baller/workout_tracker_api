import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import authRoute from './routes/auth.js';
dotenv.config();


const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/api/v1', (req, res) => {
	res.status(200).send('workout api v1');
});

app.use('/api/v1/auth', authRoute);

app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message,
		},
	});
});

const port = process.env.PORT || 5000;
export const start = async () => {
	try {
		app.listen(port, () => {
			console.log(`We are live at 127.0.0.1:${port}`);
		});
	} catch (e) {
		console.error(e)
	}
}

export default app;
