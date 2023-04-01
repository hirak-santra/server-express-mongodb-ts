import { Express, Request, Response, NextFunction } from 'express';
import fs, { ReadStream } from 'fs';
import path from 'path';
import { Stream } from 'stream';

const mime = require('mime-types');

export default class FileService {

    basePath = './src/resources';

    getPath(filePath: string): string {
        return path.join(process.cwd(), this.basePath, filePath);
    }

    sendFile(req: Request, res: Response, next: NextFunction, filePath: string) {
        const absPath = this.getPath(filePath);
        res.sendFile(absPath, (err) => {
            if (err) {
                console.log(err);
                next('Not Found!');
            } else {
                next();
                console.log('Sent:', absPath);
            }
        });
    }

    sendFileStream(req: Request, res: Response, next: NextFunction, filePath: string) {
        const absPath = this.getPath(filePath);
        const mimeType = mime.lookup(filePath);
        const streaming: ReadStream = fs.createReadStream(absPath);
        let length = 0;
        streaming.on('data', (chunk) => {
            length += chunk.length;
        });
        streaming.on('end', () => {
            console.log(length);
        });
        res.setHeader("content-length", 25959712);
        res.setHeader("content-type", mimeType);
        streaming.pipe(res);
    }
    
}
