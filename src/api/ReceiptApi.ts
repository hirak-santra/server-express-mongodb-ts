import { Express, NextFunction, Request, Response } from 'express';
import ApiMap from '../dto/ApiMap';
import FileService from '../service/FileService';
import ApiBase from './ApiBase';

export default class ReceiptApi extends ApiBase {
    
    static apiMap: ApiMap = {
        modulePath: '/v0/receipt',
        apiList: [
            {
                method: 'GET',
                path: '/all',
                callerMethod: 'getAllReceipts' 
            },
            {
                method: 'GET',
                path: '/download',
                callerMethod: 'downLoadReceipt' 
            }
        ]
    };

    constructor(private readonly app: Express, private readonly basePath: string) {
        super(app, basePath, ReceiptApi.apiMap);
    }

    getAllReceipts(req: Request, res: Response) {
        res.send('This is receipt page.');
    }

    downLoadReceipt(req: Request, res: Response, next: NextFunction) {
        const fileService = new FileService();
        fileService.sendFileStream(req, res, next, 'large.pdf');
    }
}
