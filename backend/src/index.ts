import "reflect-metadata";
import * as dotenv from 'dotenv';

import app from './app';
import connect from "../connect";

dotenv.config();
connect.run()
    .then(() => {
        // start express server
        app.listen(process.env.BACKEND_PORT);
        console.log(`Express server has started on port ${process.env.BACKEND_PORT}. Open http://localhost:${process.env.BACKEND_PORT}/movies to see results`);
    })
    .catch((e) => console.log('db was not connected', e));
