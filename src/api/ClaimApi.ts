import { Express, NextFunction, Request, Response } from 'express';
import ApiMap from '../dto/ApiMap';
import ApiBase from './ApiBase';

export default class ClaimApi extends ApiBase {

    static apiMap: ApiMap = {
        modulePath: '/v0/claim',
        apiList: [
            {
                method: 'GET',
                path: '/claim/all',
                callerMethod: 'getAllClaims' 
            }
        ]
    };
    
    constructor(private readonly app: Express, private readonly basePath: string) {
        super(app, basePath, ClaimApi.apiMap);
    }

    getAllClaims(req: Request, res: Response, next: NextFunction) {

    }

}
