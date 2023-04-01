import { Express, NextFunction, Request, Response } from 'express';
import ApiMap from '../dto/ApiMap';
import MongooseUserModel from '../model/MongooseUserModel';
import ApiBase from './ApiBase';

export default class UserApi extends ApiBase {

    static apiMap: ApiMap = {
        modulePath: '/v0/user',
        apiList: [
            {
                method: 'GET',
                path: '/all',
                callerMethod: 'addNewUser' 
            }
        ]
    };
    
    constructor(private readonly app: Express, private readonly basePath: string) {
        super(app, basePath, UserApi.apiMap);
    }

    addNewUser(req: Request, res: Response, next: NextFunction) {
        const mongooseUserModel = new MongooseUserModel();
        mongooseUserModel.addUser(null, ()=>{

        });
        res.send({});
    }

}
