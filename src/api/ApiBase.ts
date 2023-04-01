import { Express, NextFunction, Request, Response } from 'express';
import ApiMap from "../dto/ApiMap";

export default class ApiBase {
    private static apiCount = 1;
    private modPath: string;

    constructor(
        public readonly _app: Express, 
        private readonly _basePath: string, 
        private readonly _apiMap: ApiMap
    ) {
        this.modPath = _basePath + _apiMap.modulePath;
    }

    passApiPath(path: string): string {
        return this.modPath + path;
    }

    init() {
        for(const apiMapObject of this._apiMap.apiList) {
            const methodFn = apiMapObject.method.toLowerCase();
            const apiPath = this.passApiPath(apiMapObject.path);
            console.log(`${ApiBase.apiCount})=====>${apiPath}`);
            (this._app as any)[methodFn](apiPath, (this as any)[apiMapObject.callerMethod]);
            ApiBase.apiCount++;
        }
    }

}
