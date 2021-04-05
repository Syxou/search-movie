import * as express from "express";
import * as cors from 'cors';
import * as bodyParser from "body-parser";
import * as dotenv from 'dotenv';
import * as logger from 'morgan';

import movieRouter from './controller/movie/movie.router';
import userRouter from './controller/user/user.router';

dotenv.config();

const app: express.Application = express();

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/movies', movieRouter);
app.use(userRouter);

app.use((error: express.ErrorRequestHandler, _: any, res: express.Response, __: any) => {
    console.log(
        `Error processing request ${error}. See next message for details`
    );
    return res.status(500).json({ error: "internal server error" });
});

export default app;
