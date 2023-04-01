import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import ReceiptApi from './api/ReceiptApi';
import LoginApi from './api/LoginApi';
import ClaimApi from './api/ClaimApi';
import UserApi from './api/UserApi';
import MongooseDB from './model/MongooseDB';
import MongoDb from './model/MongoDb';

const API_CLASSES = [
    UserApi,
    ReceiptApi,
    LoginApi,
    ClaimApi
];

export default class Application {

    basePath: string = '/api';

    constructor() {
        dotenv.config();
        console.log('Please wait while app is being started....');
    }

    start() {
        MongoDb.setEnv();
        MongoDb.getDB();

        const app: Express = express();
        app.use(this.basePath, (req: Request, res: Response, next)=>{
            next();
        });
        const port = process.env.PORT;
        this.serveAPI(app);
        app.get('/', (req: Request, res: Response) => {
            res.send('Welcome to WTW home');
        });
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    }


    serveAPI(app: Express) {
        API_CLASSES.forEach((cla)=>{
            const obj: any = new cla(app, this.basePath);
            obj.init();
        });
    }

}
