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



// createConnection().then(async connection => {

//     // create express app
//     const app = express();
//     app.use(bodyParser.json());
//     app.use(bodyParser.urlencoded({ extended: true }));
//     app.use(cors());

//     // register express routes from defined application routes
//     Routes.forEach(route => {
//         (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
//             const result = (new (route.controller as any))[route.action](req, res, next);
//             if (result instanceof Promise) {
//                 result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

//             } else if (result !== null && result !== undefined) {
//                 res.json(result);
//             }
//         });
//     });

//     // setup express app here
//     // ...

//     // start express server
//     app.listen(process.env.BACKEND_PORT);

//     console.log(`Express server has started on port ${process.env.BACKEND_PORT}. Open http://localhost:${process.env.BACKEND_PORT}/movies to see results`);

// }).catch(error => console.log(error));
