import { Express, NextFunction, Request, Response } from 'express';
import ApiMap from '../dto/ApiMap';
import ApiBase from './ApiBase';

export default class LoginApi extends ApiBase {

    static apiMap: ApiMap = {
        modulePath: '/v0/login',
        apiList: [
            {
                method: 'GET',
                path: '/login',
                callerMethod: 'doLogin' 
            }
        ]
    };
    
    constructor(private readonly app: Express, private readonly basePath: string) {
        super(app, basePath, LoginApi.apiMap);
    }

    doLogin(req: Request, res: Response, next: NextFunction) {

    }

}
