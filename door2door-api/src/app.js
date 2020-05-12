import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes/index';
import errorHandler from './middlewares/error.middleware';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(routes);
app.use(errors());
app.use(errorHandler);

export default app;
