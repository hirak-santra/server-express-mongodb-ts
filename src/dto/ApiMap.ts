export default interface ApiMap {
    modulePath: string,
    apiList: ApiMapObject[];
}

export interface ApiMapObject {
    method: ('GET' | 'POST' | 'DELETE' | 'PUT');
    path: string;
    callerMethod: string;
}
